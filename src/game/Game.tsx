import React from 'react';
import './Game.css';
import QuickStats from './QuickStats';

interface GameProps {
    paused: boolean;
    setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const Game = ({ paused, setPaused }: GameProps) => {
    const time = 254123,
        wpm = 90,
        acc = 98.56;

    return (
        <main id="game">
            <QuickStats time={time} wpm={wpm} acc={acc} paused={paused} />
            <section
                id="text-area"
                onClick={() => setPaused(!paused)}
            ></section>
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
