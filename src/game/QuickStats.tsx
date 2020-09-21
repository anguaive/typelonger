import React from 'react';
import { formatTime } from '../utils';

interface QuickStatsProps {
    time: number;
    wpm: number;
    acc: number;
    paused: boolean;
}

const QuickStats = ({ time, wpm, acc, paused }: QuickStatsProps) => {
    return (
        <aside id="quick-stats">
            <section className={'stats-container' + (paused ? '' : ' pale')}>
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
        </aside>
    );
};

export default QuickStats;
