import React from 'react';
import { Alias } from '../scheme';
import { formatHours } from '../utils';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({
    alias,
    placement,
}: {
    alias: Alias;
    placement: number;
}) => {
    return (
        <Link
            className="alias-card"
            to={'/profile/' + alias.username + '/' + alias.name}
        >
            <div className="alias-card__placement">#{placement} </div>
            <div className="alias-card__name">{alias.name} </div>
            <div className="alias-card__username">({alias.username})</div>
            <div className="alias-card__stats-container">
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
        </Link>
    );
};

export default UserCard;
