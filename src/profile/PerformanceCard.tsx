import React from 'react';
import { Performance } from './Profile';
import { ReactComponent as ClockIcon } from '../res/clock-o.svg';
import { formatTime } from '../utils';

const PerformanceCard = (perf: Performance) => {
    return (
        <div className="performance">
            <div className="performance__title">{perf.title}</div>
            <div className="performance__section--when">
                <div className="performance__section">{perf.section}</div>
                <div className="performance__when">
                    {new Date(perf.when).toDateString()}
                </div>
            </div>
            <div className="performance__stats">
                <div>
                    <div className="icon-container">
                        <div className="icon">
                            <ClockIcon />
                        </div>
                    </div>
                    <span>{formatTime(perf.time)}</span>
                </div>
                <div>
                    {perf.points}
                    <span className="unit">pts</span>
                </div>
                <div>
                    {perf.wpm.toFixed(2)}
                    <span className="unit">wpm</span>
                </div>
                <div>
                    {perf.acc.toFixed(2)}
                    <span className="unit">acc</span>
                </div>
            </div>
        </div>
    );
};

export default PerformanceCard;
