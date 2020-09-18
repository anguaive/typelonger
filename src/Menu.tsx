import React from 'react';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';

// TODO: :focus on keyboard events only
// TODO: better transition

interface NavLink {
    path: string;
    name: string;
}

const links: NavLink[] = [
    { path: '/game', name: 'Play' },
    { path: '/matchmaking', name: 'Matchmaking' },
    { path: '/profile', name: 'Profile' },
    { path: '/rankings', name: 'Rankings' },
    { path: '/settings', name: 'Settings' },
];

interface MenuProps {
    paused: boolean;
}

const defaultStyle = {
    transition: 'opacity 100ms ease-in-out',
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 },
};

const Menu = ({ paused }: MenuProps) => {
    return (
        <Transition in={paused} timeout={100}>
            {(state) => (
                <nav
                    id="menu"
                    style={{ ...defaultStyle, ...transitionStyles[state] }}
                >
                    <ul>
                        {links.map((route, i) => (
                            <li key={i}>
                                <Link to={route.path}>{route.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </Transition>
    );
};

export default Menu;
