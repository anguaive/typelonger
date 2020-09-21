import React, { useState, useEffect } from 'react';
import './Profile.css';
import { ReactComponent as ExpandIcon } from '../res/chevron-circle-down.svg';
import { ReactComponent as ClockIcon } from '../res/clock-o.svg';
import { formatHours, formatTime } from '../utils';

interface Performance {
    title: string;
    section: string;
    when: Date;
    points: number;
    time: number;
    acc: number;
    wpm: number;
    rank: 'Normal' | 'Bronze' | 'Silver' | 'Gold';
}

interface Alias {
    name: string;
    points: number;
    time: number;
    acc: number;
    wpm: number;
    topPerformances: Performance[];
    recentPerformances: Performance[];
}

interface UserProfile {
    name: string;
    picture: string;
    since: Date;
    aliases: Alias[];
    bio: string;
}

const Profile = () => {
    const [profile, setProfile] = useState<UserProfile>();
    const [selectedAlias, setSelectedAlias] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/userProfile')
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
                console.log(profile);
            });
    }, []);

    return (
        <>
            {profile !== undefined ? (
                <main id="profile">
                    <section id="user-info">
                        <span className="container-title">
                            User information
                        </span>
                        <div id="user-info-grid" className="container">
                            <img
                                src={profile.picture}
                                className="user-info__picture"
                                alt="User"
                            />
                            <div className="user-info__username">
                                {profile.name}
                            </div>
                            <div className="user-info__aliases">
                                {profile.aliases.map((alias, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setSelectedAlias(i);
                                            console.log(profile.aliases[i]);
                                        }}
                                        className={
                                            'user-info__alias' +
                                            (i === selectedAlias
                                                ? ' alias-active'
                                                : '')
                                        }
                                    >
                                        {alias.name}
                                    </button>
                                ))}
                            </div>
                            <div className="user-info__stats">
                                <div className="user-info__stat">
                                    {profile.since}{' '}
                                    <span className="unit">since</span>
                                </div>
                                <div className="user-info__stat">
                                    {formatHours(
                                        profile.aliases[selectedAlias].time || 0
                                    )}{' '}
                                    <span className="unit">hours</span>
                                </div>
                                <div className="user-info__stat">
                                    {profile.aliases[selectedAlias].points}{' '}
                                    <span className="unit">points</span> ( #xyz
                                    )
                                </div>
                                <div className="user-info__stat">
                                    {profile.aliases[selectedAlias].wpm.toFixed(
                                        2
                                    )}{' '}
                                    <span className="unit">wpm</span>
                                </div>
                                <div className="user-info__stat">
                                    {profile.aliases[selectedAlias].acc.toFixed(
                                        2
                                    )}{' '}
                                    <span className="unit">acc</span>
                                </div>
                            </div>
                            <div className="user-info__bio">{profile.bio}</div>
                            <div className="user-info__expand">
                                <ExpandIcon />
                            </div>
                        </div>
                    </section>
                    <section id="top-performances">
                        <span className="container-title">
                            Top performances
                        </span>
                        <div className="performance-container">
                            {profile.aliases[selectedAlias].topPerformances.map(
                                (perf, i) => (
                                    <div className="performance">
                                        <div className="performance__title">
                                            {perf.title}
                                        </div>
                                        <div className="performance__section--when">
                                            <div className="performance__section">
                                                {perf.section}
                                            </div>
                                            <div className="performance__when">
                                                {new Date(
                                                    perf.when
                                                ).toDateString()}
                                            </div>
                                        </div>
                                        <div className="performance__stats">
                                            <div>
                                                <div className="icon-container">
                                                    <div className="icon">
                                                        <ClockIcon />
                                                    </div>
                                                </div>
                                                <span>
                                                    {formatTime(perf.time)}
                                                </span>
                                            </div>
                                            <div>
                                                {perf.points}
                                                <span className="unit">
                                                    pts
                                                </span>
                                            </div>
                                            <div>
                                                {perf.wpm.toFixed(2)}
                                                <span className="unit">
                                                    wpm
                                                </span>
                                            </div>
                                            <div>
                                                {perf.acc.toFixed(2)}
                                                <span className="unit">
                                                    acc
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </section>
                    <section id="recent-performances">
                        <span className="container-title">
                            Recent performances
                        </span>
                        <div className="container"></div>
                    </section>
                    <section id="performance-graph">
                        <span className="container-title">
                            Performance graph
                        </span>
                        <div className="container"></div>
                    </section>
                </main>
            ) : null}
        </>
    );
};

export default Profile;
