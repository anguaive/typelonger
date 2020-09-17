import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Menu from './Menu';
import Game from './game/Game';
import Matchmaking from './Matchmaking';
import Profile from './Profile';
import Rankings from './Rankings';
import Settings from './Settings';

function App() {
    const [paused, setPaused] = useState(false);

    console.log(paused);
    console.log(setPaused);

    return (
        <>
            <Switch>
                <Route path="/game">
                    <Game paused={paused} setPaused={setPaused} />
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
                <Route path="*" component={Game} />
            </Switch>
            <span id="watermark">typelonger</span>
            <Menu />
        </>
    );
}

export default App;
