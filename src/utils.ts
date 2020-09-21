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
