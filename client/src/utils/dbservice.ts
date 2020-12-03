import {getToken} from "./auth";

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
