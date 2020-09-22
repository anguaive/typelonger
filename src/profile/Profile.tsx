import React, { useState, useEffect } from 'react';
import './Profile.css';
import { ReactComponent as ExpandIcon } from '../res/chevron-circle-down.svg';
import { formatHours } from '../utils';
import PerformanceCard from './PerformanceCard';

export interface Performance {
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
            });
        // For some reason eslint complains about the empty deps array,
        // even though it's the RECOMMENDED way of running the hook
        // on mount only
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                    <PerformanceCard {...perf} key={i} />
                                )
                            )}
                        </div>
                    </section>
                    <section id="recent-performances">
                        <span className="container-title">
                            Recent performances
                        </span>
                        <div className="performance-container">
                            {profile.aliases[
                                selectedAlias
                            ].recentPerformances.map((perf, i) => (
                                <PerformanceCard {...perf} key={i} />
                            ))}
                        </div>
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
