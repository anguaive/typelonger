import React, { useState, useEffect } from 'react';
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

const Game = ({ paused, setPaused }: GameProps) => {
    const [textParagraphs, setTextParagraphs] = useState<string[]>([]);
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

    return (
        <main id="game">
            <QuickStats
                time={quickStats.time || 0}
                wpm={quickStats.wpm || 0}
                acc={quickStats.acc || 0}
                paused={paused}
            />
            <section id="text-area" onClick={() => setPaused(!paused)}>
                <div className="text-container">
                    {textParagraphs.map((pg) => (
                        <div className="pg">{pg}</div>
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
