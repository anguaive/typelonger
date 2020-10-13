import React, { useState, useEffect } from 'react';
import './InputPopup.css';

interface InputPopupProps {
    hidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    hint?: string;
    placeholder?: string;
    submit: (value: string) => void;
    validate?: (value: string) => string[];
}

const InputPopup = ({
    hidden,
    setHidden,
    title,
    hint,
    placeholder,
    submit,
    validate,
}: InputPopupProps) => {
    const [value, setValue] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const input = React.createRef<HTMLInputElement>();

    useEffect(() => {
        input.current && input.current.focus();
    }, [hidden]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate) {
            const validationErrors = validate(value);
            if (validationErrors.length) {
                setErrors(validationErrors);
                return;
            }
        }
        submit(value);
        hide();
    };

    const hide = () => {
        setHidden(true);
        setErrors([]);
        setValue('');
    };

    return (
        <section
            onClick={() => {
                hide();
            }}
            className={hidden ? 'hidden' : ''}
            id="input-popup-backdrop"
            tabIndex={-1}
        >
            <div onClick={(event) => event.stopPropagation()} id="input-popup">
                <span className="input-popup__title">{title}</span>
                <span className="input-popup__hint">{hint}</span>
                {errors.map((error) => (
                    <span className="input-popup__error">{error}</span>
                ))}
                <form
                    className="input-popup__form"
                    onSubmit={(event) => onSubmit(event)}
                >
                    <input
                        onKeyDown={(event) => {
                            event.key === 'Escape' && hide();
                        }}
                        ref={input}
                        className="input-popup__input"
                        type="search"
                        placeholder={placeholder || 'search'}
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    ></input>
                    <div className="input-popup__buttons">
                        <button
                            type="button"
                            onClick={() => hide()}
                            className="button"
                        >
                            close
                        </button>
                        <input
                            type="submit"
                            className="button button-primary"
                            value="OK"
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default InputPopup;
