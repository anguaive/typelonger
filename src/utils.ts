import { Alias, Text, Performance } from './types';

export interface Action {
    text: string;
    handler: Function;
}

export interface Keypress {
    time: number;
    position: Position;
    letter: string;
    correct?: boolean;
}

export const getUserActions = (alias: Alias, location: any, history: any) => [
    {
        text: 'View profile',
        handler: () => history.push(`/profile/${alias.username}/${alias.name}`),
    },
];

export const getTextActions = (text: Text, location: any, history: any) => [
    {
        text: 'View details',
        handler: () => history.push('text/TEXT_ID'),
    },
];

export const getPerfActions = (perf: Performance, location: any, history: any) => {
    const actions = [
        {
            text: 'View replay',
            handler: () => {},
        },
        {
            text: 'Race',
            handler: () => {},
        },
    ];

    if (location) {
        const pathname = location.pathname.split('/')[1];
        if (pathname === 'text') {
            actions.splice(0, 0, {
                text: 'View profile',
                handler: () =>
                    history.push(
                        `/profile/${perf.userName || 'USER_NAME'}/${perf.aliasName || 'ALIAS_NAME'}`
                    ),
            });
        }
        if (pathname === 'profile') {
            actions.splice(0, 0, {
                text: 'View text',
                handler: () => history.push('/text/TEXT_ID/section/SECTION_ID'),
            });
        }
    }

    return actions;
};

// Format milliseconds to hours
export const formatHours = (time: number): string => {
    return (time / 1000 / 60 / 60).toFixed(2);
};

// Format milliseconds to [hh:]mm:ss
export const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / 1000 / 60 / 60);
    const min = Math.floor((ms / 1000 / 60) % 60);
    const sec = Math.floor((ms / 1000) % 60);
    const locale: string = 'en-US';
    const options: Intl.NumberFormatOptions = {
        minimumIntegerDigits: 2,
        useGrouping: false,
    };

    const hoursString = hours > 0 ? `${hours.toLocaleString(locale, options)}:` : '';

    return `${hoursString}${min.toLocaleString(locale, options)}:${sec.toLocaleString(
        locale,
        options
    )}`;
};

export const shallowCompare = (obj1: any, obj2: any) =>
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
