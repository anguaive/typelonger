import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import './Auth.css';
import {RegisterData, LoginData} from '../../utils/types';
import {SessionContext, register, login} from '../../utils/auth';

interface UserValidationRules {
    [key: string]: number;

    nameMinLength: number;
    nameMaxLength: number;
    aliasMinLength: number;
    aliasMaxLength: number;
    passwordMinLength: number;
    passwordMaxLength: number;
}

const initialRegisterData = {
    name: '',
    alias: '',
    email: '',
    password: '',
    passwordRepeat: '',
};

const initialLoginData = {
    name: '',
    password: '',
};

const validationRules: UserValidationRules = {
    nameMinLength: 1,
    nameMaxLength: 32,
    aliasMinLength: 1,
    aliasMaxLength: 32,
    passwordMinLength: 8,
    passwordMaxLength: 48,
};

const Auth = () => {
    const history = useHistory();
    const [registerData, setRegisterData] = useState<RegisterData>(
        initialRegisterData
    );
    const [loginData, setLoginData] = useState<LoginData>(initialLoginData);
    const [loginWarning, setLoginWarning] = useState<string>('');
    const {sessionData, setSessionData} = useContext(SessionContext);

    // Reset the login warning if the form input changes
    useEffect(() => {
        if (loginWarning) {
            setLoginWarning('');
        }
    }, [loginData]);

    const handleRegisterChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newRegisterData = {...registerData};
        newRegisterData[event.target.name] = event.target.value;
        setRegisterData(newRegisterData);

        if (event.target.name === 'passwordRepeat') {
            if (event.target.value !== newRegisterData.password) {
                event.target.setCustomValidity(
                    'Please match your previous password.'
                );
            } else {
                event.target.setCustomValidity('');
            }
        }
    };

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLoginData = {...loginData};
        newLoginData[event.target.name] = event.target.value;
        setLoginData(newLoginData);
    };

    const submitRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        register(registerData)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(loginData)
            .then((response: { status: number; data: any }) => {
                switch (response.status) {
                    case 200: // Ok, token is returned
                        if (sessionData && setSessionData) {
                            setSessionData({...sessionData, name: response.data.username, aliasId: response.data.selectedAliasId});
                        }
                        history.push('/');
                        break;
                    case 400: // Bad request, error is returned
                        setLoginWarning(response.data.error);
                        break;
                    default:
                        break;
                }
                return response;
            })
            .catch(error => console.log(error));

    };

    const showHint = (event: React.FocusEvent<HTMLLabelElement>) => {
        (event.target.previousSibling as Element).classList.remove('hidden');
    };

    const hideHint = (event: React.FocusEvent<HTMLLabelElement>) => {
        (event.target.previousSibling as Element).classList.add('hidden');
    };

    const lengthConstraint = (inputName: string) => {
        return (
            <div>
                Must be between {validationRules[inputName + 'MinLength']} and{' '}
                {validationRules[inputName + 'MaxLength']} characters.
            </div>
        );
    };

    return (
        <main id="auth">
            <section className="container" id="auth-register">
                <div className="auth-title">Register</div>
                <form onSubmit={(event) => submitRegister(event)}>
                    <label
                        onFocus={(event) => showHint(event)}
                        onBlur={(event) => hideHint(event)}
                    >
                        <div>
                            Name <span className="asterisk">*</span>
                        </div>
                        <div className="hint hidden">
                            <div>
                                May only contain alphanumeric characters and the
                                _ underscore character.
                            </div>
                            {lengthConstraint('name')}
                        </div>
                        <input
                            required
                            minLength={validationRules['nameMinLength']}
                            maxLength={validationRules['nameMaxLength']}
                            pattern="[a-zA-Z0-9_]*"
                            name="name"
                            value={registerData.name}
                            placeholder="name"
                            onChange={(event) => handleRegisterChange(event)}
                        />
                    </label>
                    <label
                        onFocus={(event) => showHint(event)}
                        onBlur={(event) => hideHint(event)}
                    >
                        <div>
                            Alias <span className="asterisk">*</span>
                        </div>
                        <div className="hint hidden">
                            <div>
                                May only contain alphanumeric characters and the
                                _ underscore character.
                            </div>
                            {lengthConstraint('alias')}
                        </div>
                        <input
                            required
                            minLength={validationRules['aliasMinLength']}
                            maxLength={validationRules['aliasMaxLength']}
                            pattern="[a-zA-Z0-9_]*"
                            name="alias"
                            placeholder="alias"
                            onChange={(event) => handleRegisterChange(event)}
                        />
                    </label>
                    <label
                        onFocus={(event) => showHint(event)}
                        onBlur={(event) => hideHint(event)}
                    >
                        <div>
                            E-mail address <span className="asterisk">*</span>
                        </div>
                        <div className="hint hidden">
                            <div>Must be a valid e-mail address!</div>
                        </div>
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="e-mail"
                            onChange={(event) => handleRegisterChange(event)}
                        />
                    </label>
                    <label
                        onFocus={(event) => showHint(event)}
                        onBlur={(event) => hideHint(event)}
                    >
                        <div>
                            Password <span className="asterisk">*</span>
                        </div>
                        <div className="hint hidden">
                            {lengthConstraint('password')}
                        </div>
                        <input
                            required
                            minLength={validationRules['passwordMinLength']}
                            maxLength={validationRules['passwordMaxLength']}
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={(event) => handleRegisterChange(event)}
                        />
                    </label>
                    <label
                        onFocus={(event) => showHint(event)}
                        onBlur={(event) => hideHint(event)}
                    >
                        <div>
                            Repeat password <span className="asterisk">*</span>
                        </div>
                        <div className="hint hidden">
                            <div>Must match the previous given password.</div>
                        </div>
                        <input
                            required
                            minLength={validationRules['passwordMinLength']}
                            maxLength={validationRules['passwordMaxLength']}
                            name="passwordRepeat"
                            type="password"
                            placeholder="repeat password"
                            onChange={(event) => handleRegisterChange(event)}
                        />
                    </label>
                    <div>
                        <span className="asterisk">*</span> required
                    </div>
                    <div className="auth-form__button-group">
                        <button className="button button-primary" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </section>
            <section className="container" id="auth-login">
                <span className="auth-title">Login</span>
                <form onSubmit={(event) => submitLogin(event)}>
                    <label>
                        Name
                        <input
                            required
                            name="name"
                            placeholder="name"
                            onChange={(event) => handleLoginChange(event)}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            required
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={(event) => handleLoginChange(event)}
                        />
                    </label>
                    <div className="validation-error">{loginWarning}</div>
                    <div className="auth-form__button-group">
                        <button className="button" type="button">
                            Forgot password
                        </button>
                        <button className="button button-primary" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Auth;
