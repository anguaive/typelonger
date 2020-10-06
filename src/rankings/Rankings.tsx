import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './Rankings.css';
import { Alias } from '../scheme';
import { getUserActions } from '../utils';
import UserCard from '../cards/UserCard';
import Card from '../cards/Card';
import Radio from '../radio/Radio';
import { ReactComponent as DoubleUpArrow } from '../res/angle-double-up.svg';
import { ReactComponent as UpArrow } from '../res/angle-up.svg';
import { ReactComponent as DownArrow } from '../res/angle-down.svg';
import { ReactComponent as DoubleDownArrow } from '../res/angle-double-down.svg';

const Rankings = () => {
    const sortOptions = ['rank', 'time', 'wpm', 'acc'];
    const positionOptions = ['top', 'near me'];
    const [items, setItems] = useState<Alias[]>();
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState(0);
    const [position, setPosition] = useState(0);
    const itemsPerPage = 10;
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (items === undefined) {
        return null;
    }

    return (
        <main id="rankings">
            <section id="rankings-list">
                {items
                    .slice(
                        page * itemsPerPage,
                        Math.min((page + 1) * itemsPerPage, items.length)
                    )
                    .map((item, i) => (
                        <Card
                            key={i}
                            actions={getUserActions(item, location, history)}
                        >
                            <UserCard
                                alias={item}
                                placement={page * itemsPerPage + i + 1}
                            />
                        </Card>
                    ))}
            </section>
            <section id="rankings-actions" className="list-actions">
                <Radio
                    values={positionOptions}
                    selected={position}
                    setSelected={setPosition}
                />
                <Radio
                    values={sortOptions}
                    selected={sort}
                    setSelected={setSort}
                />
            </section>
            <section id="rankings-controls" className="list-controls">
                <div className="list-buttons">
                    <button
                        className="button svg-button"
                        onClick={() => setPage(0)}
                    >
                        <DoubleUpArrow />
                    </button>
                    <button
                        className="button svg-button"
                        onClick={() => page > 0 && setPage(page - 1)}
                    >
                        <UpArrow />
                    </button>
                    <button
                        className="button svg-button"
                        onClick={() =>
                            page < Math.floor(items.length / itemsPerPage) &&
                            setPage(page + 1)
                        }
                    >
                        <DownArrow />
                    </button>
                    <button
                        className="button svg-button"
                        onClick={() =>
                            setPage(Math.floor(items.length / itemsPerPage))
                        }
                    >
                        <DoubleDownArrow />
                    </button>
                </div>
                <div className="list-results-indicator">
                    <div>Displaying</div>
                    <div>
                        [{page * itemsPerPage + 1}-
                        {Math.min((page + 1) * itemsPerPage, items.length)}] of{' '}
                        {items.length}
                    </div>
                    <div>results</div>
                </div>
            </section>
        </main>
    );
};

export default Rankings;
