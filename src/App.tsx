import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import './Colourschemes.css';
import Menu from './Menu';
import Game from './game/Game';
import Matchmaking from './Matchmaking';
import Profile from './profile/Profile';
import Rankings from './rankings/Rankings';
import Settings, {
    AppSettings,
    SETTINGS_STORAGE,
    defaultSettings,
} from './Settings';
import NoMatch from './NoMatch';
import Search from './search/Search';
import TextDetails from './text-details/TextDetails';
import Texts from './texts/Texts';
import { AuthStatus } from './auth';

interface AppRoute {
    path: string;
    component: JSX.Element;
}

const App = () => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>({
        userName: 'Username',
    });
    const [settings, setSettings] = useState<AppSettings>(
        (() => {
            const storedSettings = window.localStorage.getItem(
                SETTINGS_STORAGE
            );
            return storedSettings
                ? JSON.parse(storedSettings)
                : defaultSettings;
        })()
    );

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

    const logOut = () => {
        console.log('logging out');
        setAuthStatus({ ...authStatus, userName: '' });
    };

    useEffect(() => {
        document.body.className = settings.colourscheme;
    });

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
            component: <Profile authStatus={authStatus} logOut={logOut} />,
        },
        {
            path: '/rankings',
            component: <Rankings />,
        },
        {
            path: '/settings',
            component: (
                <Settings settings={settings} setSettings={setSettings} />
            ),
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
            <Menu paused={paused} loggedIn={!!authStatus.userName} />
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
};

export default App;
