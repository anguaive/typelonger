import React from 'react';
import './PerformanceCard.css';
import { Performance } from '../../utils/types';
import { formatTime } from '../../utils/utils';

const PerformanceCard = (perf: Performance) => {
    console.log(perf);
    const playedBy = perf.aliasName ? (
        <div className="performance__played-by">
            Played by {perf.aliasName} ({perf.userName})
        </div>
    ) : null;

    return (
        <>
            <div className="performance__title">{perf.textTitle}</div>
            <div className="performance__section--when">
                <div className="performance__section">{perf.sectionTitle}</div>
                <div className="performance__when">{new Date(perf.date).toDateString()}</div>
            </div>
            {playedBy}
            <div className="performance__stats">
                <div>
                    <i className="material-icons md-18">schedule</i>
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
                    {perf.accuracy.toFixed(2)}
                    <span className="unit">acc</span>
                </div>
            </div>
        </>
    );
};

export default PerformanceCard;
