import React, { useState } from 'react';
import './Auth.css';

interface RegisterForm {
    name?: string;
    alias?: string;
    email?: string;
    password?: string;
    passwordRepeat?: string;
}

interface LoginForm {
    name?: string;
    password?: string;
}

const Auth = () => {
    const [registerData, setRegisterData] = useState<RegisterForm>({});
    const [registerValidationErrors, setRegisterValidatonErrors] = useState<
        string[]
    >([]);

    const [loginData, setLoginData] = useState<LoginForm>({});
    const [loginValidationErrors, setLoginValidatonErrors] = useState<string[]>(
        []
    );

    const submitRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Check if name is valid and available
        // Check if alias is valid
        // Check if email is valid and available
        // Check if password is valid
        // Check is password and password repeat match
        // Proceed with submission
    };

    const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Check if a user with the given name exists
        // Check if the given password is correct
        // Proceed with submission
    };

    const showHint = (event: React.FocusEvent<HTMLLabelElement>) => {
        (event.target.previousSibling as Element).classList.remove('hidden');
    };

    const hideHint = (event: React.FocusEvent<HTMLLabelElement>) => {
        (event.target.previousSibling as Element).classList.add('hidden');
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
                        Name
                        <span className="hint hidden">
                            {`May only contain alphanumeric characters and the _ underscore character, and mustn't be longer than 32 characters.`}
                        </span>
                        <input placeholder="name" />
                    </label>
                    <label
                        onFocus={(event) => showHint(event)}
                        onBlur={(event) => hideHint(event)}
                    >
                        Alias
                        <span className="hint hidden">
                            {`May only contain alphanumeric characters and the _ underscore character, and mustn't be longer than 32 characters.`}
                        </span>
                        <input placeholder="alias" />
                    </label>
                    <label
                        onFocus={(event) => showHint(event)}
                        onBlur={(event) => hideHint(event)}
                    >
                        E-mail address
                        <span className="hint hidden">
                            Must be a valid e-mail address!
                        </span>
                        <input placeholder="e-mail" />
                    </label>
                    <label
                        onFocus={(event) => showHint(event)}
                        onBlur={(event) => hideHint(event)}
                    >
                        Password
                        <span className="hint hidden">
                            Must be between 6 and 48 characters.
                        </span>
                        <input placeholder="password" />
                    </label>
                    <label
                        onFocus={(event) => showHint(event)}
                        onBlur={(event) => hideHint(event)}
                    >
                        Repeat password
                        <span className="hint hidden">
                            Must match the previous given password.
                        </span>
                        <input
                            name="repeatPassword"
                            placeholder="repeat password"
                        />
                    </label>
                    <div className="auth-form__validation_errors">
                        {registerValidationErrors.map((error) => (
                            <div className="validation-error">{error}</div>
                        ))}
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
                        <input placeholder="name" />
                    </label>
                    <label>
                        Password
                        <input placeholder="password" />
                    </label>
                    <div className="auth-form__validation_errors">
                        {loginValidationErrors.map((error) => (
                            <div className="validation-error">{error}</div>
                        ))}
                    </div>
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
