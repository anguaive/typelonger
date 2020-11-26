import {RegisterData, LoginData, SessionData} from './types';
import React, {createContext, SetStateAction} from 'react';

type SessionContextType = {
    sessionData: SessionData;
    setSessionData: (_: SessionData) => void;
}

export const SessionContext = createContext<Partial<SessionContextType>>({});

const url = "https://localhost:5001/api/auth";
const key = "authToken";

export const getToken = () => {
    return window.localStorage.getItem(key);
}

export const setToken = (token: string) => {
    window.localStorage.setItem(key, token);
}

export const removeToken = () => {
    window.localStorage.removeItem(key);
}

export const register = (data: RegisterData) => {
    return fetch(url + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: data.name, alias: data.alias, email: data.email, password: data.password})
    });
}

export const login = (data: LoginData) => {
    return fetch(url + `/login?username=${data.name}&password=${data.password}`);
}

export const logout = () => {
    removeToken();
}

