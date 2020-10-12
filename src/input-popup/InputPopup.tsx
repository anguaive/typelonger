import React, { useState, useEffect } from 'react';
import './InputPopup.css';

interface InputPopupProps {
    hidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    hint?: string;
    submit: (value: string) => void;
}

const InputPopup = ({
    hidden,
    setHidden,
    title,
    hint,
    submit,
}: InputPopupProps) => {
    const [value, setValue] = useState('');
    const input = React.createRef<HTMLInputElement>();

    useEffect(() => {
        input.current && input.current.focus();
    }, [hidden]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submit(value);
        hide();
    };

    const hide = () => {
        setHidden(true);
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
                <form
                    className="input-popup__form"
                    onSubmit={(event) => onSubmit(event)}
                >
                    <input
                        onKeyDown={(event) => event.key === 'Escape' && hide()}
                        ref={input}
                        className="input-popup__input"
                        type="search"
                        placeholder="search"
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
                        <input type="submit" className="button" value="OK" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default InputPopup;
