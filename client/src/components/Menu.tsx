import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import {SessionContext} from '../utils/auth';

// TODO: :focus on keyboard events only

interface NavLink {
    path: string;
    name: string;
    icon: string;
    style?: string;
}

interface MenuProps {
    paused: boolean;
    location: any;
}

const initialLinks: NavLink[] = [
    { path: '/game', name: 'Play', icon: 'keyboard' },
    { path: '/texts', name: 'Browse', icon: 'menu_book' },
    { path: '/matchmaking', name: 'Matchmaking', icon: 'sports_esports' },
    { path: '/rankings', name: 'Rankings', icon: 'emoji_events' },
    { path: '/settings', name: 'Settings', icon: 'settings' },
];

const Menu = ({ paused, location }: MenuProps) => {
    const [links, setLinks] = useState<NavLink[]>(initialLinks);
    const {sessionData, setSessionData} = useContext(SessionContext);

    useEffect(() => {
        // Deep copy of initialLinks
        const initialLinksCopy = initialLinks.slice();
        if (sessionData && !!sessionData.name) {
            initialLinksCopy.splice(3, 0, {
                path: `/profile/${sessionData.name}`,
                name: 'Profile',
                icon: 'face',
            });
        } else {
            initialLinksCopy.splice(3, 0, {
                path: '/auth',
                name: 'Log in',
                icon: 'face',
                style: 'nav-item-glowing',
            });
        }
        setLinks(initialLinksCopy);
    }, [sessionData]);

    const isSelected = (link: NavLink) => {
        const locationHead = location.pathname.split('/')[1];
        if ('/' + locationHead === link.path) {
            return true;
        }
        return false;
    };

    return (
        <>
            <CSSTransition classNames="menu" in={paused} timeout={300}>
                {(state) => (
                    <nav id="menu">
                        <ul id="menu-navbar">
                            <li className="nav-logo">
                                <Link to="/">
                                    <span className="link-name">typelonger</span>
                                    <i className="link-icon material-icons md-48">expand_more</i>
                                </Link>
                            </li>
                            {links.map((link, i) => {
                                const selected = isSelected(link) ? 'nav-item-selected' : null;
                                return (
                                    <li
                                        className={['nav-item', selected, link.style || null].join(
                                            ' '
                                        )}
                                        key={i}
                                    >
                                        <Link to={link.path}>
                                            <i className="link-icon material-icons md-48">
                                                {link.icon}
                                            </i>
                                            <span className="link-name">{link.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                )}
            </CSSTransition>
        </>
    );
};

export default Menu;
