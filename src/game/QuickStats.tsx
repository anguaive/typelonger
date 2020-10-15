import React from 'react';
import { formatTime } from '../utils';

interface QuickStatsProps {
    time: number;
    wpm: number;
    acc: number;
}

const QuickStats = ({ time, wpm, acc }: QuickStatsProps) => {
    return (
        <section className="stats-container">
            <div className="time">{formatTime(time)}</div>
            <div className="wpm">
                {wpm}
                <span className="unit"> wpm</span>
            </div>
            <div className="acc">
                {acc}
                <span className="unit"> acc</span>
            </div>
        </section>
    );
};

export default QuickStats;
