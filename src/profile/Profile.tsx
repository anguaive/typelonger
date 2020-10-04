import React, { useState, useEffect } from 'react';
import './Profile.css';
import { ReactComponent as ExpandIcon } from '../res/chevron-circle-down.svg';
import { formatHours } from '../utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PerformanceCard from './PerformanceCard';
import Radio from '../radio/Radio';
import { User } from '../scheme';

const Profile = () => {
    const [profile, setProfile] = useState<User>();
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

    if (profile === undefined) {
        return null;
    }

    return (
        <main id="profile">
            <section id="user-info">
                <span className="container-title">User information</span>
                <div id="user-info-grid" className="container">
                    <img src={profile.picture} className="user-info__picture" alt="User" />
                    <div className="user-info__username">{profile.name}</div>
                    <div className="user-info__aliases">
                        <Radio
                            values={profile.aliases.map((alias) => alias.name)}
                            selected={selectedAlias}
                            setSelected={setSelectedAlias}
                        />
                    </div>
                    <TransitionGroup component={null}>
                        <CSSTransition key={selectedAlias} timeout={300} classNames="new-alias">
                            <>
                                <div className="user-info__stats">
                                    <div className="user-info__stat">
                                        {profile.since} <span className="unit">since</span>
                                    </div>
                                    <div className="user-info__stat">
                                        {formatHours(profile.aliases[selectedAlias].time || 0)}{' '}
                                        <span className="unit">hours</span>
                                    </div>
                                    <div className="user-info__stat">
                                        {profile.aliases[selectedAlias].points}{' '}
                                        <span className="unit">points</span> ( #xyz )
                                    </div>
                                    <div className="user-info__stat">
                                        {profile.aliases[selectedAlias].wpm.toFixed(2)}{' '}
                                        <span className="unit">wpm</span>
                                    </div>
                                    <div className="user-info__stat">
                                        {profile.aliases[selectedAlias].acc.toFixed(2)}{' '}
                                        <span className="unit">acc</span>
                                    </div>
                                </div>
                            </>
                        </CSSTransition>
                    </TransitionGroup>
                    <div className="user-info__bio">{profile.bio}</div>
                    <div className="user-info__expand">
                        <ExpandIcon />
                    </div>
                </div>
            </section>
            <TransitionGroup component={null}>
                <CSSTransition key={selectedAlias} timeout={300} classNames="new-alias">
                    <section id="top-performances">
                        <span className="container-title">Top performances</span>
                        <div className="performance-container">
                            {profile.aliases[selectedAlias].topPerformances.map((perf, i) => (
                                <PerformanceCard {...perf} key={i} />
                            ))}
                        </div>
                    </section>
                </CSSTransition>
            </TransitionGroup>
            <TransitionGroup component={null}>
                <CSSTransition key={selectedAlias} timeout={300} classNames="new-alias">
                    <section id="recent-performances">
                        <span className="container-title">Recent performances</span>
                        <div className="performance-container">
                            {profile.aliases[selectedAlias].recentPerformances.map((perf, i) => (
                                <PerformanceCard {...perf} key={i} />
                            ))}
                        </div>
                    </section>
                </CSSTransition>
            </TransitionGroup>
            <section id="performance-graph">
                <span className="container-title">Performance graph</span>
                <div className="container"></div>
            </section>
        </main>
    );
};

export default Profile;
