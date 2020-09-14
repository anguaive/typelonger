import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Game from './Game';
import Matchmaking from './Matchmaking';
import Profile from './Profile';
import Rankings from './Rankings';
import Settings from './Settings';

const Menu = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/game">
                    <Game />
                </Route>
                <Route path="/matchmaking">
                    <Matchmaking />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/rankings">
                    <Rankings />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
            </Switch>
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
        </BrowserRouter>
    );
};

export default Menu;
