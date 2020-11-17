import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import useInterval from '@use-it/interval';
import { shallowCompare } from '../utils';
import { max } from 'd3-array';
import { Keypress, Position, Paragraph, ComputedStats } from '../types';
import './Game.css';
import SegmentStatsChart from '../charts/SegmentStatsChart';
import QuickStats from './QuickStats';

interface GameProps {
    paused: boolean;
    setPaused: React.Dispatch<React.SetStateAction<boolean>>;
    finished: boolean;
    setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

// How often the timer ticks
const defaultTimerInterval = 100;

// How often the quick stats visuals are updated
const quickStatsInterval = 1000;

const Game = ({ paused, setPaused, finished, setFinished }: GameProps) => {
    const textContainer = useRef<HTMLDivElement>(null);
    const scrollGuide = useRef<HTMLDivElement>(null);
    const caret = useRef<HTMLDivElement>(null);
    const firstParagraph = useRef<HTMLDivElement>(null);
    let charElement = useRef<HTMLElement | null>(null);
    let topMargin = useRef<number>(0);
    let caretHeight = useRef<number>(0);

    let windowResizeTimeout = useRef<number>(-1);
    let timerInterval = useRef<number | null>(null);
    let time = useRef<number>(0);

    const [keypresses, setKeypresses] = useState<Keypress[]>([]);
    const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
    const [position, setPosition] = useState<Position>({
        pg: 0,
        char: 0,
        realChar: 0,
    });

    const [quickStats, setQuickStats] = useState<ComputedStats>({
        time: 0,
        wpm: 0,
        acc: 100,
    });

    // Update timer
    useInterval(() => {
        time.current += timerInterval.current || 0;
    }, timerInterval.current);

    // Update quick stats
    useInterval(() => {
        const newWpm =
            time.current === 0
                ? 0
                : keypresses.filter((kp) => kp.letter !== 'Backspace').length /
                  5 /
                  (time.current / 60 / 1000);
        const newAcc = !keypresses.length
            ? 100
            : (keypresses.filter((kp) => kp.correct).length /
                  keypresses.filter((kp) => kp.letter !== 'Backspace').length) *
              100;
        setQuickStats({
            time: time.current,
            wpm: newWpm,
            acc: newAcc,
        });
    }, quickStatsInterval);

    // Window resize events
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    // Set initial top margin at 1/3 height
    useEffect(() => {
        // Typescript whines about textContainer possibly being undefined,
        // even if I'm making sure it's not :shrug:
        // @ts-ignore
        topMargin.current = Math.floor(textContainer.current?.clientHeight / 3 || 0);
        caretHeight.current = topMargin.current;

        firstParagraph.current?.setAttribute('style', `margin-top: ${topMargin.current}px`);
    }, [paragraphs.length]);

    const handleWindowResize = () => {
        // The new size isn't actually relevant, and the text reflows itself,
        // but the caret needs to be realigned manually

        window.clearTimeout(windowResizeTimeout.current);
        windowResizeTimeout.current = window.setTimeout(handleWindowResizeEnd, 200);
    };

    const handleWindowResizeEnd = () => {
        scrollText(position);
        moveCaret(position);
    };

    // Fetch text
    useEffect(() => {
        fetch('http://localhost:3001/gameText')
            .then((response) => response.json())
            .then((data) => {
                const pgs = data.paragraphsText.map((text: string) => {
                    return {
                        text: text,
                        controlCharIndices: [],
                        ignoredCharIndices: [],
                        displayedIgnoredCharIndices: [],
                        surplusCharIndices: [],
                    };
                });
                processParagraphs(pgs);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Move caret when position changes, and scroll text if entering new line
    useEffect(() => {
        const newCharElement = getCharElement(position);
        if (newCharElement) {
            charElement.current = newCharElement;
            scrollText(position);
            moveCaret(position);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    // Compute initial and final positions
    // useLayoutEffect, because we need to wait for the DOM mutations to finish
    useLayoutEffect(() => {
        if (initialPosition) {
            charElement.current = getCharElement(initialPosition);
            setPosition(initialPosition);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paragraphs.length]);

    // Handle pause/unpause
    useEffect(() => {
        if (paused) {
            timerInterval.current = null;
            textContainer.current?.blur();
            textContainer.current?.classList.remove('cursor-hidden');
            textContainer.current?.setAttribute('style', 'overflow-y: auto');
        } else {
            textContainer.current?.focus();
            textContainer.current?.classList.add('cursor-hidden');
            textContainer.current?.setAttribute('style', 'overflow-y: hidden');
            scrollGuide.current?.scrollIntoView({
                block: 'start',
                inline: 'nearest',
                behavior: 'smooth',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused]);

    const scrollText = (pos: Position) => {
        const char = getCharElement(position);

        if (char) {
            if (char.offsetTop !== caretHeight.current) {
                topMargin.current -= char.offsetTop - caretHeight.current;
            }

            firstParagraph.current?.setAttribute('style', `margin-top: ${topMargin.current}px`);
        }
    };

    const moveCaret = (pos: Position) => {
        const char = getCharElement(position);

        if (char) {
            caret.current?.setAttribute(
                'style',
                `margin-top: ${caretHeight.current}px; margin-left: ${char.offsetLeft - 1}px`
            );
        }
    };

    const processParagraphs = (pgs: Paragraph[]) => {
        for (let pgIndex = 0; pgIndex < pgs.length; pgIndex++) {
            let pg = pgs[pgIndex];

            // TODO: only process paragraphs that have changed since last time

            // Reset the index arrays we're going to modify
            pg.ignoredCharIndices = [];
            pg.controlCharIndices = [];
            pg.displayedIgnoredCharIndices = [];

            const letters = pg.text.split('');
            let ignoreNext = false;
            let escapeNext = false;

            letters.forEach((letter, letterIndex) => {
                if (ignoreNext) {
                    pg.ignoredCharIndices.push(letterIndex);
                    ignoreNext = false;
                }

                // Handle all surplus chars as regular, non-control chars
                if (pg.surplusCharIndices.includes(letterIndex)) {
                    ignoreNext = false;
                    escapeNext = false;
                } else {
                    switch (letter) {
                        case '$':
                            if (!escapeNext) {
                                escapeNext = true;
                                pg.controlCharIndices.push(letterIndex);
                            } else {
                                escapeNext = false;
                            }
                            break;
                        case '^':
                            if (!escapeNext) {
                                ignoreNext = true;
                                escapeNext = true;
                                pg.controlCharIndices.push(letterIndex);
                            } else {
                                escapeNext = false;
                            }
                            break;
                        default:
                            escapeNext = false;
                            break;
                    }
                }
            }); // letters.forEach

            pg.ignoredCharIndices.forEach((iCI, i) => {
                pg.displayedIgnoredCharIndices[i] =
                    iCI - pg.controlCharIndices.filter((cCI) => cCI < iCI).length;
            });
        }

        setParagraphs(pgs);
    };

    const offsetPosition = (pos: Position, pgs: Paragraph[], offset: number): Position => {
        if (offset === 0) {
            return pos;
        }

        let newPos = { ...pos };
        const currentPg = pgs[pos.pg];
        // To next paragraph, if there is one
        if (pos.char + offset > currentPg.text.length - currentPg.controlCharIndices.length - 1) {
            if (pos.pg !== pgs.length - 1) {
                newPos.pg++;
                newPos.char = -1;
                newPos.realChar = -1;

                newPos = offsetPosition(
                    newPos,
                    pgs,
                    offset -
                        (currentPg.text.length -
                            currentPg.controlCharIndices.length -
                            currentPg.displayedIgnoredCharIndices.filter((iCI) => iCI > pos.char)
                                .length -
                            pos.char -
                            1)
                );
            }
        } else if (
            pos.char -
                currentPg.displayedIgnoredCharIndices.filter((dICI) => dICI < pos.char).length +
                offset <
            0
        ) {
            // To prev paragraph, if there is one
            if (pos.pg !== 0) {
                const prevPg = pgs[pos.pg - 1];

                newPos.pg--;
                newPos.char = prevPg.text.length - prevPg.controlCharIndices.length;
                newPos.realChar = prevPg.text.length;

                newPos = offsetPosition(
                    newPos,
                    pgs,
                    offset +
                        (pos.char -
                            currentPg.displayedIgnoredCharIndices.filter((dICI) => dICI < pos.char)
                                .length)
                );
            }
        } else {
            newPos = offsetPositionWithinParagraph(newPos, currentPg, offset);
        }

        return newPos;
    };

    const offsetPositionWithinParagraph = (
        pos: Position,
        pg: Paragraph,
        offset: number
    ): Position => {
        const delta = offset > 0 ? 1 : -1;
        while (offset) {
            const dICI = pg.displayedIgnoredCharIndices;
            const ciCI = pg.controlCharIndices.concat(pg.ignoredCharIndices);
            do {
                pos.char += delta;
            } while (dICI.includes(pos.char));

            do {
                pos.realChar += delta;
            } while (ciCI.includes(pos.realChar));

            offset += offset > 0 ? -1 : 1;
        }

        return pos;
    };

    const paragraphQuotes = useMemo(() => {
        const lenChars = 32;
        if (!paragraphs || !paragraphs.length) {
            return [];
        }

        const quotes: string[] = [];
        for (let pg of paragraphs) {
            let quote = '';
            if (pg.text.length < lenChars) {
                quote = pg.text;
            } else {
                quote = pg.text.slice(0, lenChars);
                quote = quote.slice(0, quote.lastIndexOf(' ')) + '...';
            }
            quotes.push(quote);
        }

        // Remove control chars from quotes. The quote is always at the beginning of a paragraph,
        // so cCI can be used
        for (let i = 0; i < quotes.length; i++) {
            let quote = quotes[i];
            const cCI = paragraphs[i].controlCharIndices;
            if (!cCI.length) {
                continue;
            }
            let quoteFragments: string[] = [];
            let previousCI = 0;
            for (let ci of cCI) {
                quoteFragments.push(quote.slice(previousCI, ci));
                previousCI = ci + 1;
            }
            quotes[i] = quoteFragments.join('');
        }

        return quotes;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paragraphs.length]);

    const initialPosition = useMemo(() => {
        if (paragraphs && paragraphs.length) {
            const initialPos = offsetPositionWithinParagraph(
                { pg: 0, char: -1, realChar: -1 },
                paragraphs[0],
                1
            );
            return initialPos;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paragraphs[0]]);

    const finalPosition = useMemo(() => {
        if (paragraphs && paragraphs.length) {
            const lastPgIdx = paragraphs.length - 1;
            let finalPos = {
                pg: lastPgIdx,
                char:
                    paragraphs[lastPgIdx].text.length -
                    paragraphs[lastPgIdx].controlCharIndices.length,
                realChar: paragraphs[lastPgIdx].text.length,
            };
            finalPos = offsetPositionWithinParagraph(finalPos, paragraphs[lastPgIdx], -1);
            return finalPos;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paragraphs[paragraphs.length - 1]]);

    // Check finish condition
    useEffect(() => {
        if (finalPosition && shallowCompare(position, finalPosition)) {
            setFinished(true);
            setPaused(true);
            // TODO: redirect to results page
        }
    }, [position, finalPosition, setPaused, setFinished]);

    const insertCharElement = (pos: Position, newChar: string): Paragraph[] => {
        // TODO: test if newPg and newPgs are necessary
        const currentPg = paragraphs[pos.pg];
        const newPg = { ...currentPg };
        newPg.text =
            currentPg.text.slice(0, pos.realChar) + newChar + currentPg.text.slice(pos.realChar);
        newPg.surplusCharIndices.push(pos.realChar);
        const newPgs = [...paragraphs];
        newPgs.splice(pos.pg, 1, newPg);

        // TODO: make sure finalPosition is updated if needed
        processParagraphs(newPgs);
        return newPgs;
    };

    const removeCharElement = (pos: Position) => {
        const currentPg = paragraphs[pos.pg];
        const newPg = { ...currentPg };
        newPg.text = currentPg.text.slice(0, pos.realChar) + currentPg.text.slice(pos.realChar + 1);
        newPg.surplusCharIndices.pop();
        const newPgs = [...paragraphs];
        newPgs.splice(pos.pg, 1, newPg);
        processParagraphs(newPgs);
    };

    const getCharElement = (pos: Position): HTMLElement | null => {
        const paragraphElements = textContainer.current?.getElementsByClassName('pg');
        if (paragraphElements && paragraphElements.length) {
            return paragraphElements[pos.pg].children[pos.char] as HTMLElement;
        }
        return null;
    };

    const tryInputBackspace = (pos: Position) => {
        const currentElement = getCharElement(pos);
        if (currentElement) {
            setKeypresses([
                ...keypresses,
                { time: time.current, position: pos, letter: 'Backspace' },
            ]);
            if (currentElement.classList.contains('text-surplus')) {
                removeCharElement(pos);
            }
            currentElement.classList.remove('text-correct', 'text-incorrect', 'text-surplus');
        }
    };

    const tryInputLetter = (pos: Position, letter: string): Paragraph[] => {
        let newPgs = [...paragraphs];
        if (letter === charElement.current?.textContent) {
            charElement.current?.classList.add('text-correct');
            setKeypresses([
                ...keypresses,
                {
                    time: time.current,
                    position: pos,
                    letter: letter,
                    correct: true,
                },
            ]);
        } else {
            charElement.current?.classList.add('text-incorrect');
            setKeypresses([
                ...keypresses,
                {
                    time: time.current,
                    position: pos,
                    letter: letter,
                    correct: false,
                },
            ]);
            if (charElement.current?.textContent === ' ') {
                newPgs = insertCharElement(position, letter);
                charElement.current?.classList.add('text-surplus');
            } else {
                charElement.current?.classList.add('text-incorrect');
            }
        }

        return newPgs;
    };

    const handleKeypress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();

        let newPos = { ...position };
        if (event.key === 'Backspace') {
            newPos = offsetPosition(position, paragraphs, -1);
            tryInputBackspace(newPos);
            setPosition(newPos);
        } else if (event.key.length === 1) {
            // Resume the timer if it was stopped
            if (!timerInterval.current) {
                timerInterval.current = defaultTimerInterval;
            }

            const newPgs = tryInputLetter(position, event.key);

            // offsetPosition() needs to work with the new paragraphs (in case they changed), but
            // setting state is async and may not finish before offsetPosition() begins
            newPos = offsetPosition(position, newPgs, 1);

            // setting newPgs has already begun at this point, no need to set it here too
            // setParagraphs(newPgs);
            setPosition(newPos);
        }
    };

    // No need to recompute this on every keypress, because the consumer component is only shown
    // when the game is paused
    const segmentStats = useMemo(() => {
        // TODO: optimize
        let statsList: ComputedStats[] = [];
        const highestReachedPg = max(keypresses, (kp: Keypress) => kp.position.pg);
        if (highestReachedPg === undefined) {
            return [];
        }

        // The keypresses array is ordered by the timestamps, and the user can backtrack to previous
        // paragraphs/segments, so the array might look something like this:
        // [{pg:1, time:0}, ..., {pg:1, time: 2000}, {pg:2, time: 2200}, ..., {pg:2, time: 2400},
        // {pg:1, time: 2500}, ...]
        // We can't measure the time spent in pg1 by grouping all of pg1's keypresses into a single list
        // because we took a short detour to pg2. Subtracting the lowest pg1 timestamp (0) from the
        // highest (2500) would thus be incorrect. Instead, we gather all the distinct pg1 sequences
        // into a list, compute the total time spent in each sequence, and add them all up. This
        // doesn't take the keypresses between different pg sequences into account, so each sequence must start
        // with the previous sequence's last keypress.
        let previousKp: Keypress | null = null;
        let sequencesLists: number[][][] = [];
        for (let kp of keypresses) {
            const kppg = kp.position.pg;
            if (previousKp && previousKp.position.pg === kppg) {
                sequencesLists[kppg][sequencesLists[kppg].length - 1].push(kp.time);
            } else {
                if (!sequencesLists[kppg]) {
                    sequencesLists[kppg] = [];
                }
                sequencesLists[kppg].push([]);
                if (previousKp) {
                    sequencesLists[kppg][sequencesLists[kppg].length - 1].push(previousKp.time);
                }
                sequencesLists[kppg][sequencesLists[kppg].length - 1].push(kp.time);
            }
            previousKp = kp;
        }

        for (let i = 0; i < sequencesLists.length; i++) {
            let seqList = sequencesLists[i];
            if (seqList && seqList.length) {
                let sum = 0;
                for (let seq of seqList) {
                    if (seq && seq.length) {
                        sum += seq[seq.length - 1] - seq[0];
                    }
                }
                statsList.push({ time: sum, wpm: 0, acc: 100 });
            }
        }

        for (let pg = 0; pg <= highestReachedPg; pg++) {
            const kps = keypresses.filter((kp) => kp.position.pg === pg);
            const correctKps = kps.filter((kp) => kp.correct);
            const nonBackspaceKps = kps.filter((kp) => kp.letter !== 'Backspace');
            const time = statsList[pg].time;

            statsList[pg].pg = pg;
            statsList[pg].wpm = time === 0 ? 0 : nonBackspaceKps.length / 5 / (time / 60 / 1000);
            statsList[pg].acc = !kps.length
                ? 100
                : (correctKps.length / nonBackspaceKps.length) * 100;
        }

        return statsList;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused]);

    // can be memoized
    const displayedText = useMemo(() => {
        return (
            <>
                {paragraphs.map((pg, pgIndex) => {
                    const letters = pg.text.split('');
                    return (
                        <div
                            ref={pgIndex === 0 ? firstParagraph : null}
                            className="pg"
                            key={pgIndex}
                        >
                            {letters.map((letter, letterIndex) => {
                                let letterElement = null;

                                if (!pg.controlCharIndices.includes(letterIndex)) {
                                    letterElement = (
                                        <span
                                            className={
                                                pg.ignoredCharIndices.includes(letterIndex)
                                                    ? 'text-ignored'
                                                    : ''
                                            }
                                            key={letterIndex}
                                        >
                                            {letter}
                                        </span>
                                    );
                                }

                                return letterElement;
                            })}
                        </div>
                    );
                })}
            </>
        );
    }, [paragraphs]);

    return (
        <main id="game">
            <aside id="quick-stats" className={paused ? '' : 'pale'}>
                <QuickStats time={quickStats.time} wpm={quickStats.wpm} acc={quickStats.acc} />
            </aside>
            <aside id="title" className={paused ? '' : 'pale'}>
                <div className="text-title">The Witcher - Blood of Elves</div>
                <div className="section-title">Chapter one</div>
            </aside>
            <section
                id="text-area"
                onClick={() => {
                    setPaused(finished || !paused);
                }}
            >
                <div
                    className="text-container"
                    tabIndex={1}
                    ref={textContainer}
                    onKeyDown={(event) => handleKeypress(event)}
                >
                    <div className="scroll-guide" ref={scrollGuide}></div>
                    {displayedText}
                    <div className="caret" ref={caret} />
                </div>
            </section>
            <section id="scorebar"></section>
            <section id="detailed-stats">
                <div className="segment-stats-chart-container">
                    {paused && (
                        <SegmentStatsChart data={segmentStats} paragraphQuotes={paragraphQuotes} />
                    )}
                </div>
            </section>
        </main>
    );
};
export default Game;
