import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
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

interface Dimensions {
    fontSizePx: number;
    lineHeightPx: number;
}

const Game = ({ paused, setPaused }: GameProps) => {
    const textContainer = useRef<HTMLDivElement>(null);
    const caret = useRef<HTMLDivElement>(null);
    const dimensions: Dimensions = {
        fontSizePx: 20,
        lineHeightPx: 22,
    };
    const [textParagraphs, setTextParagraphs] = useState<string[]>([]);

    // "Logical" position of the caret
    const [position, setPosition] = useState<Position>({
        pg: 0,
        char: 0,
    });

    const [quickStats, setQuickStats] = useState<QuickStats>({
        time: 254123,
        wpm: 90,
        acc: 98.56,
    });

    useEffect(() => {
        fetch('http://localhost:3001/gameText')
            .then((response) => response.json())
            .then((data) => setTextParagraphs(data.paragraphs));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
        const firstCharElement = getCharElement(position);
        if (firstCharElement) {
            moveCaretTo(firstCharElement);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textParagraphs]);

    useEffect(() => {
        if (paused) {
            textContainer.current?.blur();
        } else {
            textContainer.current?.focus();
        }
    }, [paused]);

    const moveCaretTo = (char_: Element) => {
        const char = char_ as HTMLElement;
        caret.current?.setAttribute(
            'style',
            `margin-top: ${char.offsetTop}px; margin-left: ${
                char.offsetLeft - 2
            }px`
        );
    };

    const getCharElement = (pos: Position): Element | null => {
        const paragraphs = textContainer.current?.getElementsByClassName('pg');
        if (paragraphs && paragraphs.length) {
            const char = paragraphs[pos.pg].children[pos.char];
            console.log(char);
            return char;
        }
        return null;
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        let newPg = position.pg;
        let newChar = position.char;
        const currentPg = textParagraphs[position.pg];

        // Check exit condition
        if (
            position.char + 1 === currentPg.length &&
            position.pg + 1 === textParagraphs.length
        ) {
            // Redirect to Results page
            console.log('exit condition reached');
            return;
        }

        // Calculate new caret position
        if (position.char + 1 === currentPg.length) {
            // Move one paragraph down
            newPg = position.pg + 1;
            newChar = 0;
        } else {
            newChar = position.char + 1;
        }

        const newCharElement = getCharElement({ pg: newPg, char: newChar });
        if (newCharElement) {
            moveCaretTo(newCharElement);
        }

        setPosition({ pg: newPg, char: newChar });
    };

    return (
        <main id="game">
            <QuickStats
                time={quickStats.time || 0}
                wpm={quickStats.wpm || 0}
                acc={quickStats.acc || 0}
                paused={paused}
            />
            <section id="text-area" onClick={() => setPaused(!paused)}>
                <div
                    className="text-container"
                    tabIndex={1}
                    ref={textContainer}
                    onKeyDown={(event) => handleKeyPress(event)}
                >
                    {textParagraphs.map((pg, i) => (
                        <div key={i} className="pg">
                            {pg.split('').map((letter, i) => (
                                <span key={i}>{letter}</span>
                            ))}
                        </div>
                    ))}
                    <div className="caret" ref={caret} />
                </div>
            </section>
            <section id="scorebar" className={paused ? '' : 'hidden'}>
                scorebar
            </section>
            <section id="detailed-stats" className={paused ? '' : 'hidden'}>
                detailed stats
            </section>
        </main>
    );
};

export default Game;
