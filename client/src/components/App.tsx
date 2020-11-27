import React, { useState, useEffect, createContext } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import '../Colourschemes.css';
import Menu from './Menu';
import Game from './game/Game';
import Matchmaking from './Matchmaking';
import Profile from './profile/Profile';
import Rankings from './rankings/Rankings';
import Auth from './auth/Auth';
import Settings, { AppSettings, SETTINGS_STORAGE, defaultSettings } from './settings/Settings';
import NoMatch from './NoMatch';
import TextDetails from './text-details/TextDetails';
import Texts from './texts/Texts';
import {Keypress, Paragraph, Position, SessionData} from '../utils/types';
import {SessionContext} from "../utils/auth";

interface AppRoute {
    path: string;
    component: JSX.Element;
}

const App = () => {
    const [sessionData, setSessionData] = useState<SessionData>(
        {name: 'Username', alias: ''});

    // State responsible for restoring the game state
    const [gameTime, setGameTime] = useState<number>(0);
    const [gameKeypresses, setGameKeypresses] = useState<Keypress[]>([]);
    const [gameParagraphs, setGameParagraphs] = useState<Paragraph[]>([]);
    const [gamePosition, setGamePosition] = useState<Position>({pg: 0, char: -1, realChar: -1});

    const [settings, setSettings] = useState<AppSettings>(
        (() => {
            const storedSettings = window.localStorage.getItem(SETTINGS_STORAGE);
            return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
        })()
    );

    const [searchHidden, setSearchHidden] = useState(true);
    const [paused, setPaused] = useState(true);
    const [finished, setFinished] = useState(false);
    const location = useLocation();

    const keyboardHandler = (event: KeyboardEvent) => {
        const skippedElementTypes = ['INPUT', 'TEXTAREA'];
        const locationHead = location.pathname.split('/')[1];
        event.preventDefault();
        if (!skippedElementTypes.includes((event.target as HTMLElement).nodeName)) {
            switch (event.key) {
                case 's':
                    if (locationHead === 'profile') {
                        setSearchHidden(false);
                    }
                    break;
                case 'Escape':
                    if (locationHead === 'game') {
                        setPaused(finished || true);
                    }
                    break;
                case 'Enter':
                    if (locationHead === 'game') {
                        setPaused(finished || false);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        document.body.className = settings.colourscheme;
    }, [settings]);

    useEffect(() => {
        document.addEventListener('keyup', keyboardHandler, false);
        return () => {
            document.removeEventListener('keyup', keyboardHandler, false);
        };
    }, []);

    const routes: AppRoute[] = [
        {
            path: '/game/:sectionId',
            component: (
                <Game
                    paused={paused}
                    setPaused={setPaused}
                    finished={finished}
                    setFinished={setFinished}
                    time={gameTime}
                    setTime={setGameTime}
                    keypresses={gameKeypresses}
                    setKeypresses={setGameKeypresses}
                    paragraphs={gameParagraphs}
                    setParagraphs={setGameParagraphs}
                    position={gamePosition}
                    setPosition={setGamePosition}
                />
            ),
        },
        {
            path: '/matchmaking',
            component: <Matchmaking />,
        },
        {
            path: '/profile/:username',
            component: (
                <Profile
                    searchHidden={searchHidden}
                    setSearchHidden={setSearchHidden}
                />
            ),
        },
        {
            path: '/rankings',
            component: <Rankings />,
        },
        {
            path: '/settings',
            component: <Settings settings={settings} setSettings={setSettings} />,
        },
        {
            path: '/text',
            component: <TextDetails/>,
        },
        {
            path: '/texts',
            component: <Texts />,
        },
        {
            path: '/auth',
            component: <Auth />,
        },
        { path: '*', component: <NoMatch /> },
    ];

    return (
        <SessionContext.Provider value={{sessionData: sessionData, setSessionData: (sessionData) => setSessionData(sessionData)}}>
            <Menu paused={paused} location={location} />
            <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames="page" timeout={300}>
                    <Switch location={location}>
                        {routes.map((route, i) => (
                            <Route key={i} path={route.path}>
                                <section className="page">{route.component}</section>
                            </Route>
                        ))}
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </SessionContext.Provider>
    );
};

export default App;
