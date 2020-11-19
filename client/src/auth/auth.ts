import {RegisterData, LoginData} from '../types';

class Auth {
    static KEY = "authToken";
    static URL = "https://localhost:5001/api/auth";

    getToken() {
        return window.localStorage.getItem(Auth.KEY);
    }

    setToken(token: string) {
        window.localStorage.setItem(Auth.KEY, token);
    }

    removeToken() {
        window.localStorage.removeItem(Auth.KEY);
    }

    register(data: RegisterData) {
        return fetch(Auth.URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: data.name, alias: data.alias, email: data.email, password: data.password})
        });
    }

    login(data: LoginData) {
        return fetch(Auth.URL + `/login?username=${data.name}&password=${data.password}`);
    }

    logout() {
        this.removeToken();
    }

}

export default Auth;