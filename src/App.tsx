import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import Menu from './Menu';
import Game from './game/Game';
import Matchmaking from './Matchmaking';
import Profile from './Profile';
import Rankings from './Rankings';
import Settings from './Settings';
import NoMatch from './NoMatch';

interface AppRoute {
    path: string;
    component: JSX.Element;
}

function App() {
    const [paused, setPaused] = useState(true);
    const location = useLocation();

    const routes: AppRoute[] = [
        {
            path: '/game',
            component: <Game paused={paused} setPaused={setPaused} />,
        },
        {
            path: '/matchmaking',
            component: <Matchmaking />,
        },
        {
            path: '/profile',
            component: <Profile />,
        },
        {
            path: '/rankings',
            component: <Rankings />,
        },
        {
            path: '/settings',
            component: <Settings />,
        },
        { path: '*', component: <NoMatch /> },
    ];

    return (
        <>
            <Menu paused={paused} />
            <TransitionGroup component={null}>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={300}
                >
                    <Switch location={location}>
                        {routes.map((route, i) => (
                            <Route key={i} path={route.path}>
                                <section className="page">
                                    {route.component}
                                </section>
                            </Route>
                        ))}
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </>
    );
}

export default App;
