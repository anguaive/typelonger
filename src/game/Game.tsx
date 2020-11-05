import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import useInterval from '@use-it/interval';
import './Game.css';
import QuickStats from './QuickStats';

interface GameProps {
    paused: boolean;
    setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

interface QuickStats {
    // Current time elapsed (ms), words per minute, and accuracy (%)
    time?: number;
    wpm?: number;
    acc?: number;
}

interface Position {
    // Index of paragraph the caret is on  - [0, length)
    pg: number;

    // Index of the character HTML element the caret is on, inside the current paragraph
    // Only includes "visible" characters
    char: number;

    // Index of the plaintext character the caret is on, inside the current paragraph
    // Includes "invisible" characters, i.e. control characters
    realChar: number;
}

interface KeyPress {
    letter: string;
    correct: boolean;
}

interface Paragraph {
    text: string;
    controlCharIndices: number[];
    ignoredCharIndices: number[];
    displayedIgnoredCharIndices: number[];
    surplusCharIndices: number[];
}

// How often the timer ticks
const defaultTimerInterval = 100;

// How often the quick stats visuals are updated
const quickStatsInterval = 1000;

const Game = ({ paused, setPaused }: GameProps) => {
    const textContainer = useRef<HTMLDivElement>(null);
    const caret = useRef<HTMLDivElement>(null);
    let charElement = useRef<HTMLElement | null>(null);
    let initialPosition = useRef<Position | null>(null);
    let finalPosition = useRef<Position | null>(null);
    let correctKeypresses = useRef<number>(0);
    let incorrectKeypresses = useRef<number>(0);

    // TODO: use keypresses to track keypresses :o
    let keypresses = useRef<KeyPress[]>([]);
    let windowResizeTimeout = useRef<number>(-1);
    let timerInterval = useRef<number | null>(null);

    const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
    const [position, setPosition] = useState<Position>({
        pg: 0,
        char: 0,
        realChar: 0,
    });

    const [quickStats, setQuickStats] = useState<QuickStats>({
        time: 0,
        wpm: 0,
        acc: 100,
    });

    const [time, setTime] = useState<number>(0);

    // Timer
    useInterval(() => {
        setTime(time + (timerInterval.current || 0));
    }, timerInterval.current);

    // Quick stats
    useInterval(() => {
        const newAcc =
            correctKeypresses.current + incorrectKeypresses.current
                ? correctKeypresses.current / correctKeypresses.current +
                  incorrectKeypresses.current
                : 0;
        setQuickStats({
            time: time,
            wpm: 0,
            acc: newAcc,
        });
    }, quickStatsInterval);

    // Window resize events
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    const handleWindowResize = () => {
        // The new size isn't actually relevant, and the text reflows itself,
        // but the caret needs to be realigned manually

        window.clearTimeout(windowResizeTimeout.current);
        windowResizeTimeout.current = window.setTimeout(handleWindowResizeEnd, 200);
    };

    const handleWindowResizeEnd = () => {
        moveCaret(position);
    };

    // Fetch text
    useEffect(() => {
        fetch('http://localhost:3001/gameTextDebug')
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

    // Move caret when position changes
    useEffect(() => {
        const newCharElement = getCharElement(position);
        if (newCharElement) {
            charElement.current = newCharElement;
            moveCaret(position);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    // Compute initial and final positions
    // useLayoutEffect, because we need to wait for the DOM mutations to finish
    useLayoutEffect(() => {
        if (paragraphs && paragraphs.length) {
            // Compute initial position and place caret there
            initialPosition.current = offsetPositionWithinParagraph(
                { pg: 0, char: -1, realChar: -1 },
                paragraphs[0],
                1
            );

            charElement.current = getCharElement(initialPosition.current);
            moveCaret(initialPosition.current);
            setPosition(initialPosition.current);

            // Compute final position
            const lastPgIdx = paragraphs.length - 1;
            finalPosition.current = {
                pg: lastPgIdx,
                char:
                    paragraphs[lastPgIdx].text.length -
                    paragraphs[lastPgIdx].controlCharIndices.length,
                realChar: paragraphs[lastPgIdx].text.length,
            };
            finalPosition.current = offsetPositionWithinParagraph(
                finalPosition.current,
                paragraphs[lastPgIdx],
                -1
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paragraphs.length]);

    // Handle pause/unpause
    useEffect(() => {
        if (paused) {
            timerInterval.current = null;
            textContainer.current?.blur();
            textContainer.current?.classList.remove('cursor-hidden');
        } else {
            textContainer.current?.focus();
            textContainer.current?.classList.add('cursor-hidden');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused]);

    const moveCaret = (pos: Position) => {
        const char = getCharElement(position);
        if (char) {
            caret.current?.setAttribute(
                'style',
                `margin-top: ${char.offsetTop}px; margin-left: ${char.offsetLeft - 1}px`
            );
        }
    };

    const processParagraphs = (pgs: Paragraph[]) => {
        pgs.forEach((pg, pgIndex) => {
            // Only process paragraphs that have changed
            if (pg.text === pgs[pgIndex].text) {
                // TODO: can't break inside forEach XD
            }

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
        }); // pgs.forEach

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
            } else {
                newPos = finalPosition.current!;
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
            } else {
                newPos = initialPosition.current!;
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
            correctKeypresses.current++; //TODO
        } else {
            incorrectKeypresses.current++; //TODO
            charElement.current?.classList.add('text-incorrect');
            if (charElement.current?.textContent === ' ') {
                newPgs = insertCharElement(position, letter);
                charElement.current?.classList.add('text-surplus');
            } else {
                charElement.current?.classList.add('text-incorrect');
            }
        }

        return newPgs;
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
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

            // Check exit condition
            if (newPos === finalPosition.current) {
                // TODO: redirect to results page
            }
        }
    };

    // can be memoized
    const displayedText = useMemo(() => {
        return (
            <>
                {paragraphs.map((pg, pgIndex) => {
                    const letters = pg.text.split('');
                    return (
                        <div className="pg" key={pgIndex}>
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
            <aside id="game-title" className={paused ? '' : 'pale'}>
                <div className="game-title__title">The Witcher - Blood of Elves</div>
                <div className="game-title__section">Chapter one</div>
            </aside>
            <aside id="quick-stats" className={paused ? '' : 'pale'}>
                <QuickStats time={time} wpm={0} acc={0} />
            </aside>
            <section id="text-area" onClick={() => setPaused(!paused)}>
                <div
                    className="text-container"
                    tabIndex={1}
                    ref={textContainer}
                    onKeyDown={(event) => handleKeyPress(event)}
                >
                    {displayedText}
                    <div className="caret" ref={caret} />
                </div>
            </section>
            <section id="scorebar" className={paused ? '' : 'hidden'}></section>
            <section id="detailed-stats" className={paused ? '' : 'hidden'}></section>
        </main>
    );
};

export default Game;
