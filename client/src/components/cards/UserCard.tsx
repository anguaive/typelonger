import React from 'react';
import { Alias } from '../../utils/types';
import { formatHours } from '../../utils/utils';
import './UserCard.css';

const UserCard = ({ alias, placement }: { alias: Alias; placement: number }) => {
    return (
        <>
            <div className="user-card__placement">#{placement} </div>
            <div className="user-card__name">{alias.name} </div>
            <div className="user-card__username">({alias.username})</div>
            <div className="user-card__stats-container">
                <div>
                    {formatHours(alias.time)}
                    <div className="unit">hours</div>
                </div>
                <div>
                    {alias.points}
                    <div className="unit">points</div>
                </div>
                <div>
                    {alias.wpm.toFixed(2)}
                    <div className="unit">wpm</div>
                </div>
                <div>
                    {alias.acc.toFixed(2)}
                    <div className="unit">acc</div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
