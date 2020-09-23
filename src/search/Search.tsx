import React from 'react';
import './Search.css';

interface SearchProps {
    hidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({ hidden, setHidden }: SearchProps) => {
    return (
        <section
            onClick={(event) => {
                setHidden(true);
            }}
            className={hidden ? 'hidden' : ''}
            id="search-backdrop"
            tabIndex={-1}
        >
            <div onClick={(event) => event.stopPropagation()} id="search">
                <input
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
