import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
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

    // Index of the character the caret is on / front of, inside the current
    // paragraph - [0, size)
    char: number;
}

const defaultTimerInterval = 100;

const Game = ({ paused, setPaused }: GameProps) => {
    const textContainer = useRef<HTMLDivElement>(null);
    const caret = useRef<HTMLDivElement>(null);
    let charElement = useRef<HTMLElement | null>(null);
    let finalPosition = useRef<Position | null>(null);
    let correctKeypresses = useRef<number>(0);
    let incorrectKeypresses = useRef<number>(0);
    let windowResizeTimeout = useRef<number>(-1);
    let timerInterval = useRef<number | null>(null);

    const [textParagraphs, setTextParagraphs] = useState<string[]>([]);
    const [position, setPosition] = useState<Position>({
        pg: 0,
        char: 0,
    });

    const [time, setTime] = useState<number>(0);
    const [timerRunning, setTimerRunning] = useState(false);

    const [count, setCount] = useState(0);

    useInterval(() => {
        setTime(time + (timerInterval.current || 0));
    }, timerInterval.current);

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
        console.log(position);
        moveCaret(position);
    };

    // Fetch text
    useEffect(() => {
        fetch('http://localhost:3001/gameText')
            .then((response) => response.json())
            .then((data) => setTextParagraphs(data.paragraphs));
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
            moveCaret(position);
            setPosition(newPos);
        }

        if (textParagraphs.length) {
            finalPosition.current = {
                pg: textParagraphs.length - 1,
                char: textParagraphs[textParagraphs.length - 1].length - 1,
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textParagraphs.length]);

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

    // Need to pass the current position because useState doesn't provide a
    // callback
    const calculateOffsetPosition = (
        pos: Position,
        offset: number
    ): Position => {
        if (offset === 0) {
            return pos;
        }

        const currentPg = textParagraphs[pos.pg];
        const isForwardOffset = offset > 0;
        let newPos = { ...pos };

        if (pos.char + offset < 0) {
            if (pos.pg === 0) {
                newPos = { ...newPos, char: 0 };
            } else {
                newPos = calculateOffsetPosition(
                    {
                        pg: pos.pg - 1,
                        char: textParagraphs[pos.pg - 1].length - 1,
                    },
                    offset + (pos.char + 1)
                );
            }
        } else if (pos.char + offset >= currentPg.length) {
            if (pos.pg + 1 === textParagraphs.length) {
                newPos = { ...newPos, char: currentPg.length - 1 };
            } else {
                newPos = calculateOffsetPosition(
                    { pg: pos.pg + 1, char: 0 },
                    offset - (currentPg.length - pos.char)
                );
            }
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
        const currentPg = textParagraphs[pos.pg];
        const newPg =
            currentPg.slice(0, pos.char) + newChar + currentPg.slice(pos.char);
        textParagraphs.splice(pos.pg, 1, newPg);
        setTextParagraphs(textParagraphs);
    };

    const removeCharElement = (pos: Position) => {
        const currentPg = textParagraphs[pos.pg];
        const newPg =
            currentPg.slice(0, pos.char) + currentPg.slice(pos.char + 1);
        textParagraphs.splice(pos.pg, 1, newPg);
        setTextParagraphs(textParagraphs);
    };

    const getCharElement = (pos: Position): HTMLElement | null => {
        const paragraphs = textContainer.current?.getElementsByClassName('pg');
        if (paragraphs && paragraphs.length) {
            return paragraphs[pos.pg].children[pos.char] as HTMLElement;
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
        } else {
            if (charElement.current?.textContent === ' ') {
                insertCharElement(position, letter);
                charElement.current?.classList.add('text-surplus');
            } else {
                charElement.current?.classList.add('text-incorrect');
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();

        const currentPg = textParagraphs[position.pg];
        let newPos = position;

        if (event.key === 'Backspace') {
            newPos = calculateOffsetPosition(position, -1);
            tryInputBackspace(newPos);
        } else if (event.key.length === 1) {
            if (!timerInterval.current) {
                timerInterval.current = defaultTimerInterval;
            }
            tryInputLetter(newPos, event.key);
            newPos = calculateOffsetPosition(position, 1);
            // Check exit condition
            if (newPos === finalPosition.current) {
                // TODO: redirect to results page
            }
        }

        setPosition(newPos);
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
                    {textParagraphs.map((pg, i) => (
                        <div key={i} className="pg">
                            {pg.split('').map((letter, i) => {
                                let ignore;
                                if (letter === '^') {
                                    letter = "'";
                                    ignore = true;
                                }
                                return (
                                    <span
                                        className={ignore ? 'text-ignored' : ''}
                                        key={i}
                                    >
                                        {letter}
                                    </span>
                                );
                            })}
                        </div>
                    ))}
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
