import React from 'react';

interface QuickStatsProps {
    time: number;
    wpm: number;
    acc: number;
    paused: boolean;
}

const formatTime = (time: number): string => {
    let sec = Math.floor((time / 1000) % 60);
    let min = Math.floor(time / 1000 / 60);
    let locale: string = 'en-US';
    let options: Intl.NumberFormatOptions = {
        minimumIntegerDigits: 2,
        useGrouping: false,
    };

    return `${min.toLocaleString(locale, options)}:${sec.toLocaleString(
        locale,
        options
    )}`;
};

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
