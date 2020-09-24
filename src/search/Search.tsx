import React, { useEffect } from 'react';
import './Search.css';

interface SearchProps {
    hidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({ hidden, setHidden }: SearchProps) => {
    const searchbox = React.createRef<HTMLInputElement>();

    useEffect(() => {
        searchbox.current && searchbox.current.focus();
    });

    return (
        <section
            onClick={() => {
                setHidden(true);
            }}
            className={hidden ? 'hidden' : ''}
            id="search-backdrop"
            tabIndex={-1}
        >
            <div onClick={(event) => event.stopPropagation()} id="search">
                <input
                    onKeyDown={(event) =>
                        event.key === 'Escape' && setHidden(true)
                    }
                    ref={searchbox}
                    id="search-input"
                    type="search"
                    placeholder="search"
                ></input>
                <button
                    onClick={() => setHidden(true)}
                    id="search-close"
                    className="button"
                >
                    close
                </button>
            </div>
        </section>
    );
};

export default Search;
