const url = "https://localhost:5001/api";

const handleErrors = (response: Response) => {
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

const request = (to: string, param?: any): Promise<any> => {
    let requestUrl = `${url}/${to}/${param ? param : ''}`;
    return fetch(requestUrl)
        .then(handleErrors)
        .then(response => response.json())
        .catch(error => console.log(error));
}


export const getProfile = (username: string) => {
    return request('user', username);
}

export const getTexts = () => {
    return request('text');
}

export const getText = (id: number) => {
    return request('text', id);
}

export const getSection = (id: number) => {
    return request('section', id);
}
