import React from 'react';
import { Link } from 'react-router-dom';

// TODO: :focus on keyboard events only
// TODO: better transition

const Menu = () => {
    return (
        <nav id="menu">
            <ul>
                <li>
                    <Link to="/game">Play</Link>
                </li>
                <li>
                    <Link to="/matchmaking">Matchmaking</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/rankings">Rankings</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
