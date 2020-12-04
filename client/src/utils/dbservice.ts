import {getToken} from "./auth";
import {RawStats} from "./types";

const url = "https://localhost:5001/api";

const handleErrors = (response: Response) => {
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

const get = (to: string, param?: any): Promise<any> => {
    let requestUrl = `${url}/${to}/${param ? param : ''}`;
    return fetch(requestUrl)
        .then(handleErrors)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const getProfile = (username: string) => {
    return get('user', username);
}

export const getTexts = () => {
    return get('text');
}

export const getText = (id: number) => {
    return get('text', id);
}

export const getSection = (id: number) => {
    return get('section', id);
}

export const postAlias = (aliasName: string) => {
    let requestUrl = `${url}/alias`;
    return fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({aliasName})
    })
        .then(response => response.json());
}

export const postPerformance = (sectionId: number, segmentStats: RawStats[]) => {
    let requestUrl = `${url}/performance`;
    return fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({sectionId, segmentStats})
    })
        .then(response => response.json());
}

export const patchUser = (username: string, user: {biography?: string, pictureUrl?: string, selectedAliasId?: number}) => {
    let requestUrl = `${url}/user/${username}`;
    return fetch(requestUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(user)
    });
}

