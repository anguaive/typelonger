import React from 'react';
import { formatTime } from '../../utils/utils';
import { ComputedStats } from '../../utils/types';

const QuickStats = ({ time, wpm, acc }: ComputedStats) => {
    return (
        <section className="stats-container">
            <div className="time">{formatTime(time)}</div>
            <div className="wpm">
                {wpm.toFixed(2)}
                <span className="unit"> wpm</span>
            </div>
            <div className="acc">
                {acc.toFixed(2)}
                <span className="unit"> acc</span>
            </div>
        </section>
    );
};

export default QuickStats;
