const url = "https://localhost:5001/api";

const handleErrors = (response: Response) => {
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

export const getProfile = (name: string) => {
    return fetch(`${url}/user/${name}`)
        .then(handleErrors)
        .then((response) => response.json())
        .catch(error => console.log(error));
}
