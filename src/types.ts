export interface Performance {
    title: string;
    section: string;
    when: Date;
    points: number;
    time: number;
    acc: number;
    wpm: number;
    rank: 'Normal' | 'Bronze' | 'Silver' | 'Gold';
    aliasName?: string;
    userName?: string;
}

export interface Alias {
    name: string;
    username: string;
    points: number;
    time: number;
    acc: number;
    wpm: number;
    topPerformances: Performance[];
    recentPerformances: Performance[];
}

export interface User {
    name: string;
    picture?: string;
    since: Date;
    aliases: Alias[];
    bio: string;
}

export interface Section {
    title: string;
    content?: string;
    length: number;
    difficulty?: number;
    topPerformances?: Performance[];
    ownTopPerformance?: Performance;
}

export interface Text {
    title: string;
    coverPicture?: string;
    author: string;
    dateOfUpload: Date;
    dateOfCreation: Date;
    isbn: string;
    genre: string;
    popularity: number;
    sections: Section[];
}

export interface Position {
    // Index of paragraph the caret is on  - [0, length)
    pg: number;

    // Index of the character HTML element the caret is on, inside the current paragraph
    // Only includes "visible" characters
    char: number;

    // Index of the plaintext character the caret is on, inside the current paragraph
    // Includes "invisible" characters, i.e. control characters
    realChar: number;
}

export interface Paragraph {
    text: string;
    controlCharIndices: number[];
    ignoredCharIndices: number[];
    displayedIgnoredCharIndices: number[];
    surplusCharIndices: number[];
}

export interface ComputedStats {
    // Current time elapsed (ms), words per minute, and accuracy (%)
    time: number;
    wpm: number;
    acc: number;
    pg?: number;
}

export interface Keypress {
    position: Position;
    time: number;
    letter: string;
    correct?: boolean;
}

export interface AuthStatus {
    userName: string;
}

export interface ChartAreaProps {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}
