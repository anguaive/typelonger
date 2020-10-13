import React, { useState, useEffect, useRef } from 'react';
import './Game.css';
import QuickStats from './QuickStats';

interface GameProps {
    paused: boolean;
    setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

interface QuickStats {
    time?: number;
    wpm?: number;
    acc?: number;
}

interface Position {
    paragraphIndex: number;
    characterIndex: number;
}

interface Dimensions {
    fontSizePx: number;
    lineHeightPx: number;
}

const Game = ({ paused, setPaused }: GameProps) => {
    const textContainer = useRef<HTMLDivElement>(null);
    const dimensions: Dimensions = {
        fontSizePx: 20,
        lineHeightPx: 22,
    };
    const [textParagraphs, setTextParagraphs] = useState<string[]>([]);
    const [position, setPosition] = useState<Position>({
        paragraphIndex: 0,
        characterIndex: 0,
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

    useEffect(() => {
        console.log('Paused has changed for sure');
        console.log(textContainer);
        if (paused) {
            textContainer.current?.blur();
        } else {
            textContainer.current?.focus();
        }
    }, [paused]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(event.key);
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
                            {pg}
                        </div>
                    ))}
                    <div className="caret" />
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
