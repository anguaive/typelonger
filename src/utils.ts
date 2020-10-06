import { Alias, Text, Performance, Section } from './scheme';

export interface Action {
    text: string;
    handler: Function;
}

export const getUserActions = (alias: Alias) => [
    {
        text: 'View profile',
        handler: () => {},
    },
];

export const getTextActions = (text: Text) => [
    {
        text: 'Expand',
        handler: () => {},
    },
    {
        text: 'View details',
        handler: () => {},
    },
];

export const getSectionActions = (section: Section) => [
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

export const getPerfActions = (perf: Performance, location?: any) => {
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

    if (location && (location.pathname.split('/')[1] = 'text')) {
        actions.splice(0, 0, {
            text: 'View profile',
            handler: () => {},
        });
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
