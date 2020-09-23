import React from 'react';
import { UserListView } from './Rankings';
import { formatHours } from '../utils';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({
    user,
    placement,
}: {
    user: UserListView;
    placement: number;
}) => {
    return (
        <Link
            className="user-card"
            to={'/profile/' + user.username + '/' + user.aliasname}
        >
            <div className="user-card__placement">#{placement} </div>
            <div className="user-card__alias">{user.aliasname} </div>
            <div className="user-card__username">({user.username})</div>
            <div className="user-card__stats-container">
                <div>
                    {formatHours(user.time)}
                    <div className="unit">hours</div>
                </div>
                <div>
                    {user.points}
                    <div className="unit">points</div>
                </div>
                <div>
                    {user.wpm.toFixed(2)}
                    <div className="unit">wpm</div>
                </div>
                <div>
                    {user.acc.toFixed(2)}
                    <div className="unit">acc</div>
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
