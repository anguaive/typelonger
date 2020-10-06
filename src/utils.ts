import { Alias, Text, Performance, Section } from './scheme';

export interface Action {
    text: string;
    handler: Function;
}

export const getUserActions = (alias: Alias, location: any, history: any) => [
    {
        text: 'View profile',
        handler: () => history.push(`/profile/${alias.username}/${alias.name}`),
    },
];

export const getTextActions = (text: Text, location: any, history: any) => [
    {
        text: 'Expand',
        handler: () => {},
    },
    {
        text: 'View details',
        handler: () => history.push('text/TEXT_ID'),
    },
];

export const getSectionActions = (
    section: Section,
    location: any,
    history: any
) => [
    {
        text: 'View details',
        handler: () => {},
    },
    {
        text: 'To lobby',
        handler: () => {},
    },
    {
        text: 'Play',
        handler: () => {},
    },
];

export const getPerfActions = (
    perf: Performance,
    location: any,
    history: any
) => {
    console.log(location);
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
        if (pathname == 'text') {
            actions.splice(0, 0, {
                text: 'View profile',
                handler: () =>
                    history.push(
                        `/profile/${perf.userName || 'USER_NAME'}/${
                            perf.aliasName || 'ALIAS_NAME'
                        }`
                    ),
            });
        }
        if (pathname == 'profile') {
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

    const hoursString =
        hours > 0 ? `${hours.toLocaleString(locale, options)}:` : '';

    return `${hoursString}${min.toLocaleString(
        locale,
        options
    )}:${sec.toLocaleString(locale, options)}`;
};
