import {RegisterData, LoginData} from './types';

class AuthService {
    static KEY = "authToken";
    static URL = "https://localhost:5001/api/auth";

    getToken() {
        return window.localStorage.getItem(AuthService.KEY);
    }

    setToken(token: string) {
        window.localStorage.setItem(AuthService.KEY, token);
    }

    removeToken() {
        window.localStorage.removeItem(AuthService.KEY);
    }

    register(data: RegisterData) {
        return fetch(AuthService.URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: data.name, alias: data.alias, email: data.email, password: data.password})
        });
    }

    login(data: LoginData) {
        return fetch(AuthService.URL + `/login?username=${data.name}&password=${data.password}`);
    }

    logout() {
        this.removeToken();
    }

}

export default AuthService;