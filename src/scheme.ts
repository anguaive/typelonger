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
