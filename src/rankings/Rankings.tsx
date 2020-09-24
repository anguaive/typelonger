import React, { useState, useEffect } from 'react';
import './Rankings.css';
import UserCard from './UserCard';
import Radio from '../radio/Radio';
import { ReactComponent as DoubleUpArrow } from '../res/angle-double-up.svg';
import { ReactComponent as UpArrow } from '../res/angle-up.svg';
import { ReactComponent as DownArrow } from '../res/angle-down.svg';
import { ReactComponent as DoubleDownArrow } from '../res/angle-double-down.svg';

export interface UserListView {
    aliasname: string;
    username: string;
    time: number;
    points: number;
    wpm: number;
    acc: number;
}

const Rankings = () => {
    const sortOptions = ['rank', 'time', 'wpm', 'acc'];
    const positionOptions = ['top', 'near me'];
    const [users, setUsers] = useState<UserListView[]>();
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState(0);
    const [position, setPosition] = useState(0);
    const usersPerPage = 10;

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {users !== undefined ? (
                <main id="rankings">
                    <section id="rankings-list">
                        {users
                            .slice(
                                page * usersPerPage,
                                Math.min(
                                    (page + 1) * usersPerPage,
                                    users.length
                                )
                            )
                            .map((user, i) => (
                                <UserCard
                                    user={user}
                                    key={i}
                                    placement={page * usersPerPage + i + 1}
                                />
                            ))}
                    </section>
                    <section id="rankings-actions">
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
                    <section id="rankings-controls">
                        <div className="rankings-buttons">
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
                                    page <
                                        Math.floor(
                                            users.length / usersPerPage
                                        ) && setPage(page + 1)
                                }
                            >
                                <DownArrow />
                            </button>
                            <button
                                className="button svg-button"
                                onClick={() =>
                                    setPage(
                                        Math.floor(users.length / usersPerPage)
                                    )
                                }
                            >
                                <DoubleDownArrow />
                            </button>
                        </div>
                        <div className="rankings-indicator">
                            <div>Displaying</div>
                            <div>
                                [{page * usersPerPage + 1}-
                                {Math.min(
                                    (page + 1) * usersPerPage,
                                    users.length
                                )}
                                ] of {users.length}
                            </div>
                            <div>results</div>
                        </div>
                    </section>
                </main>
            ) : null}{' '}
        </>
    );
};

export default Rankings;
