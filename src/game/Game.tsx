import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useRef,
    useMemo,
} from 'react';
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
    // Index of paragraph the caret is on  - [0, size)
    pg: number;

    // Index of the character element the caret is on, inside the current
    // paragraph - [0, size)
    char: number;
}

interface Paragraph {
    text: string;
    controlCharIndices: number[];
    ignoredCharIndices: number[];
}

// How often the timer ticks
const defaultTimerInterval = 100;

// How often the quick stats visuals are updated
const quickStatsInterval = 1000;

const Game = ({ paused, setPaused }: GameProps) => {
    const textContainer = useRef<HTMLDivElement>(null);
    const caret = useRef<HTMLDivElement>(null);
    let charElement = useRef<HTMLElement | null>(null);
    let finalPosition = useRef<Position | null>(null);
    let correctKeypresses = useRef<number>(0);
    let incorrectKeypresses = useRef<number>(0);
    let windowResizeTimeout = useRef<number>(-1);
    let timerInterval = useRef<number | null>(null);

    const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
    const [position, setPosition] = useState<Position>({
        pg: 0,
        char: 0,
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
        windowResizeTimeout.current = window.setTimeout(
            handleWindowResizeEnd,
            200
        );
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

    // Move caret to first character
    // useLayoutEffect, because we need to wait for the DOM mutations to finish
    useLayoutEffect(() => {
        let firstCharElement = getCharElement(position);
        if (firstCharElement) {
            // Skip over any ignored characters
            let newPos = { ...position };
            while (firstCharElement!.classList.contains('text-ignored')) {
                newPos = calculateOffsetPosition(newPos, 1);
                firstCharElement = getCharElement(newPos);
            }

            charElement.current = firstCharElement;
            moveCaret(newPos);
            setPosition(newPos);
        }

        if (paragraphs.length) {
            const lastPgIdx = paragraphs.length - 1;
            finalPosition.current = {
                pg: lastPgIdx,
                char: paragraphs[lastPgIdx].text.length - 1,
            };
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
                `margin-top: ${char.offsetTop}px; margin-left: ${
                    char.offsetLeft - 1
                }px`
            );
        }
    };

    const processParagraphs = (pgs: Paragraph[]) => {
        pgs.forEach((pg, pgIndex) => {
            // Only process paragraphs that have changed
            if (pg.text === pgs[pgIndex].text) {
                // can't break inside forEach XD
            }

            const letters = pg.text.split('');
            let ignoreNext = false;
            let escapeNext = false;

            letters.forEach((letter, letterIndex) => {
                if (ignoreNext) {
                    pg.ignoredCharIndices.push(letterIndex);
                    ignoreNext = false;
                }

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
            }); // letters.forEach
        }); // pgs.forEach

        setParagraphs(pgs);
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

                                if (
                                    !pg.controlCharIndices.includes(letterIndex)
                                ) {
                                    letterElement = (
                                        <span
                                            className={
                                                pg.ignoredCharIndices.includes(
                                                    letterIndex
                                                )
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

    // Need to pass the current position because useState doesn't provide a
    // callback
    const calculateOffsetPosition = (
        pos: Position,
        offset: number
    ): Position => {
        if (offset === 0) {
            return pos;
        }

        const currentPg = paragraphs[pos.pg];
        const isForwardOffset = offset > 0;
        let newPos = { ...pos };

        // Backspace to previous line (if there is one)
        if (pos.char + offset < 0) {
            if (pos.pg === 0) {
                newPos = { ...newPos, char: 0 };
            } else {
                newPos = calculateOffsetPosition(
                    {
                        pg: pos.pg - 1,
                        char:
                            paragraphs[pos.pg - 1].text.length -
                            paragraphs[pos.pg - 1].controlCharIndices.length -
                            1,
                    },
                    offset + (pos.char + 1)
                );
            }
            // To next line (if there's one)
        } else if (
            pos.char + offset >=
            currentPg.text.length - currentPg.controlCharIndices.length
        ) {
            if (pos.pg + 1 === paragraphs.length) {
                newPos = {
                    ...newPos,
                    char:
                        currentPg.text.length -
                        currentPg.controlCharIndices.length -
                        1,
                };
            } else {
                newPos = calculateOffsetPosition(
                    { pg: pos.pg + 1, char: 0 },
                    offset -
                        (currentPg.text.length -
                            currentPg.controlCharIndices.length -
                            pos.char)
                );
            }
            // Stay within the line
        } else {
            newPos = { ...newPos, char: pos.char + offset };
        }

        // Skip over any ignored characters
        while (getCharElement(newPos)?.classList.contains('text-ignored')) {
            newPos = calculateOffsetPosition(newPos, isForwardOffset ? 1 : -1);
        }

        return newPos;
    };

    const insertCharElement = (pos: Position, newChar: string) => {
        // TODO: test if newPg and newPgs are necessary
        const currentPg = paragraphs[pos.pg];
        const newPg = { ...currentPg };
        newPg.text =
            currentPg.text.slice(0, pos.char) +
            newChar +
            currentPg.text.slice(pos.char);
        const newPgs = [...paragraphs];
        newPgs.splice(pos.pg, 1, newPg);
        processParagraphs(newPgs);
    };

    const removeCharElement = (pos: Position) => {
        const currentPg = paragraphs[pos.pg];
        const newPg = { ...currentPg };
        newPg.text =
            currentPg.text.slice(0, pos.char) +
            currentPg.text.slice(pos.char + 1);
        const newPgs = [...paragraphs];
        paragraphs.splice(pos.pg, 1, newPg);
        processParagraphs(newPgs);
    };

    const getCharElement = (pos: Position): HTMLElement | null => {
        const paragraphElements = textContainer.current?.getElementsByClassName(
            'pg'
        );
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
            currentElement.classList.remove(
                'text-correct',
                'text-incorrect',
                'text-surplus'
            );
        }
    };

    const tryInputLetter = (pos: Position, letter: string) => {
        if (letter === charElement.current?.textContent) {
            charElement.current?.classList.add('text-correct');
            correctKeypresses.current++; //TODO
        } else {
            incorrectKeypresses.current++; //TODO

            // TODO: handling of surplus characters is majorly messed up
            charElement.current?.classList.add('text-incorrect');
            // if (charElement.current?.textContent === ' ') {
            //     insertCharElement(position, letter);
            //     charElement.current?.classList.add('text-surplus');
            // } else {
            //     charElement.current?.classList.add('text-incorrect');
            // }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();

        let newPos = { ...position };

        if (event.key === 'Backspace') {
            newPos = calculateOffsetPosition(position, -1);
            tryInputBackspace(newPos);
            setPosition(newPos);
        } else if (event.key.length === 1) {
            if (!timerInterval.current) {
                timerInterval.current = defaultTimerInterval;
            }
            tryInputLetter(position, event.key);
            newPos = calculateOffsetPosition(position, 1);
            setPosition(newPos);
            // Check exit condition
            if (newPos === finalPosition.current) {
                // TODO: redirect to results page
            }
        }
    };

    return (
        <main id="game">
            <aside id="game-title" className={paused ? '' : 'pale'}>
                <div className="game-title__title">
                    The Witcher - Blood of Elves
                </div>
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
            <section
                id="detailed-stats"
                className={paused ? '' : 'hidden'}
            ></section>
        </main>
    );
};

export default Game;
