import React, { useState } from 'react';
import './PerformanceCard.css';
import { Performance } from '../scheme';
import { ReactComponent as ClockIcon } from '../res/clock-o.svg';
import { formatTime } from '../utils';

const PerformanceCard = (perf: Performance) => {
    const [displayActions, setDisplayActions] = useState<boolean>(false);
    return (
        <div className={['performance', perf.rank].join(' ')}>
            <div
                className="performance-animation"
                onMouseEnter={() => setDisplayActions(true)}
                onMouseLeave={() => setDisplayActions(false)}
            >
                <div
                    className={[
                        'performance-layout__perf',
                        displayActions ? 'invis' : null,
                    ].join(' ')}
                >
                    <div className="performance__title">{perf.title}</div>
                    <div className="performance__section--when">
                        <div className="performance__section">
                            {perf.section}
                        </div>
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
                <div
                    className={[
                        'performance-layout__actions',
                        displayActions ? null : 'invis',
                    ].join(' ')}
                >
                    <button className="button">View replay</button>
                    <button className="button">Race</button>
                </div>
            </div>
        </div>
    );
};

export default PerformanceCard;
