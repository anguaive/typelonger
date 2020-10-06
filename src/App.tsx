import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import Menu from './Menu';
import Game from './game/Game';
import Matchmaking from './Matchmaking';
import Profile from './profile/Profile';
import Rankings from './rankings/Rankings';
import Settings from './Settings';
import NoMatch from './NoMatch';
import Search from './search/Search';
import TextDetails from './text-details/TextDetails';
import Texts from './texts/Texts';

interface AppRoute {
    path: string;
    component: JSX.Element;
}

function App() {
    const [paused, setPaused] = useState(true);
    const [searchHidden, setSearchHidden] = useState(true);
    const location = useLocation();

    const keyboardHandler = useCallback(
        (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.key === 's') {
                setSearchHidden(false);
            }
        },

        []
    );

    useEffect(() => {
        document.addEventListener('keyup', keyboardHandler, false);
        return () => {
            document.removeEventListener('keyup', keyboardHandler, false);
        };
    });

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
        {
            path: '/text',
            component: <TextDetails />,
        },
        {
            path: '/texts',
            component: <Texts />,
        },
        { path: '*', component: <NoMatch /> },
    ];

    return (
        <>
            <Menu paused={paused} />
            <Search hidden={searchHidden} setHidden={setSearchHidden} />
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
