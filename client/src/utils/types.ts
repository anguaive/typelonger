export interface Performance {
    textTitle: string;
    sectionTitle: string;
    date: Date;
    points: number;
    time: number;
    accuracy: number;
    wpm: number;
    rank: 'Normal' | 'Bronze' | 'Silver' | 'Gold';
    aliasName?: string;
    userName?: string;
}

export interface Alias {
    id: number;
    name: string;
    username: string;
    points: number;
    time: number;
    accuracy: number;
    wpm: number;
    rank: number;
    topPerformances: Performance[];
    recentPerformances: Performance[];
}

export interface User {
    name: string;
    picture?: string;
    dateOfRegistration: Date;
    aliases: Alias[];
    biography: string;
}

export interface Section {
    id: number;
    title: string;
    content?: string;
    length: number;
    difficulty?: number;
    topPerformances?: Performance[];
    ownTopPerformance?: Performance;
}

export interface Text {
    id: number;
    title: string;
    coverURL?: string;
    author: string;
    dateOfUpload: Date;
    dateOfCreation: Date;
    isbn: string;
    genres: string[];
    popularity: number;
    length: number;
    sections: Section[];
}

export interface TextListView {
    id: number;
    title: string;
    author: string;
    genres: string[];
    popularity: string;
    sectionCount: number;
    length: number;
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
    accuracy: number;
    pg?: number;
}

export interface RawStats {
    time: number;
    correctKeypressCount: number;
    incorrectKeypressCount: number;
}

export interface Keypress {
    position: Position;
    time: number;
    letter: string;
    correct: boolean;
}

export interface SessionData {
    name: string;
    aliasId: number;
    sectionId: number;
}

export interface ChartAreaProps {
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

export interface RegisterData {
    [key: string]: string;

    name: string;
    alias: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

export interface LoginData {
    [key: string]: string;

    name: string;
    password: string;
}
