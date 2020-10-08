import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';

// TODO: :focus on keyboard events only
// TODO: better transition

interface NavLink {
    path: string;
    name: string;
    icon: string;
    style?: string;
}

interface MenuProps {
    paused: boolean;
    loggedIn: boolean;
}

const initialLinks: NavLink[] = [
    { path: '/game', name: 'Play', icon: 'keyboard' },
    { path: '/texts', name: 'Browse', icon: 'menu_book' },
    { path: '/matchmaking', name: 'Matchmaking', icon: 'sports_esports' },
    { path: '/rankings', name: 'Rankings', icon: 'emoji_events' },
    { path: '/settings', name: 'Settings', icon: 'settings' },
];

const defaultStyle = {
    transition: 'opacity 300ms ease-in-out',
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 },
};

const Menu = ({ paused, loggedIn }: MenuProps) => {
    const [links, setLinks] = useState<NavLink[]>(initialLinks);

    useEffect(() => {
        // Deep copy of initialLinks
        const initialLinksCopy = initialLinks.slice();
        if (loggedIn) {
            initialLinksCopy.splice(3, 0, {
                path: '/profile',
                name: 'Profile',
                icon: 'face',
            });
        } else {
            initialLinksCopy.splice(3, 0, {
                path: '/auth',
                name: 'Log in',
                icon: 'face',
                style: 'menu-glowing',
            });
        }
        setLinks(initialLinksCopy);
    }, [loggedIn]);

    return (
        <div id="menu-bar">
            <Transition in={paused} timeout={300}>
                {(state) => (
                    <nav
                        id="menu"
                        style={{ ...defaultStyle, ...transitionStyles[state] }}
                    >
                        <ul>
                            {links.map((link, i) => (
                                <li className={link.style || undefined} key={i}>
                                    <Link to={link.path}>
                                        <i className="material-icons md-48">
                                            {link.icon}
                                        </i>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </Transition>
        </div>
    );
};

export default Menu;
