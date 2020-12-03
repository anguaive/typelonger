import {RegisterData, LoginData, SessionData} from './types';
import {createContext} from 'react';

type SessionContextType = {
    sessionData: SessionData;
    setSessionData: (_: SessionData) => void;
}

export const SessionContext = createContext<Partial<SessionContextType>>({});

const url = "https://localhost:5001/api/auth";
const key = "authToken";

export const isSignedIn = () => {
    return !!getToken();
}

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
    return fetch(url + `/login?username=${data.name}&password=${data.password}`)
        .then((response) => {
            return response.json().then((data) => ({
                status: response.status,
                data,
            }));
        })
        .then((response: { status: number; data: any }) => {
            switch (response.status) {
                case 200: // Ok, token is returned
                    setToken(response.data.token);
                    break;
                case 400: // Bad request, error is returned
                    removeToken();
                    break;
                default:
                    break;
            }
            return response;
        });
}

export const authenticate = () => {
    return fetch(url + '/authenticate', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                data
            }));
        })
        .then((response: { status: number; data: any }) => {
            switch (response.status) {
                case 200: // Ok - successful authentication, sending selected alias id
                    break;
                case 401: // Unauthenticated - token expired or invalid
                    removeToken();
                    break;
                default:
                    break;
            }
            return response;
        });
}

export const logout = () => {
    removeToken();
}

