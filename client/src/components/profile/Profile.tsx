import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './Profile.css';
import { formatHours } from '../../utils/utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PerformanceCard from '../cards/PerformanceCard';
import Radio from '../radio/Radio';
import { User, SessionData } from '../../utils/types';
import { getPerfActions } from '../../utils/utils';
import Card from '../cards/Card';
import InputPopup from '../input-popup/InputPopup';
import { getProfile } from '../../utils/dbservice';
import { SessionContext, logout } from '../../utils/auth';

interface ProfileProps {
    sessionData: SessionData;
    setSessionData: React.Dispatch<React.SetStateAction<SessionData>>;
    searchHidden: boolean;
    setSearchHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile = ({ sessionData, setSessionData, searchHidden, setSearchHidden }: ProfileProps) => {
    const [profile, setProfile] = useState<User>();
    const [bioEditorHidden, setBioEditorHidden] = useState(true);
    const [newAliasHidden, setNewAliasHidden] = useState(true);
    const [bioValue, setBioValue] = useState('');
    const [selectedAlias, setSelectedAlias] = useState(0);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if(username) {
            getProfile(username)
                .then((data) => {
                    if(data) {
                        setProfile({...data, since: new Date()});
                        setBioValue(data.bio);
                    }
                });
        }
    }, [username]);

    if (profile === undefined) {
        return (
            <div>User not found!</div>
        )
    }

    const createNewAlias = (newName: string) => {
        profile.aliases.push({
            name: newName,
            username: profile.name,
            points: 0,
            time: 0,
            accuracy: 0,
            wpm: 0,
            topPerformances: [],
            recentPerformances: [],
        });
    };

    const submitSearch = (value: string) => {
        console.log(value);
    };

    const resetBioEditor = () => {
        setBioValue(profile.bio);
        setBioEditorHidden(true);
    };

    const saveBio = () => {
        setProfile({ ...profile, bio: bioValue });
        setBioEditorHidden(true);
    };

    const validateNewAlias = (newName: string): string[] => {
        const validationErrors = [];
        const aliasNames = profile.aliases.map((alias) => alias.name);
        if (newName.length > 32) {
            validationErrors.push('The name exceeds the maximum length of 32 characters!');
        }
        if (newName.match(/^[a-zA-Z_]+$/g) === null) {
            validationErrors.push('The name contains illegal characters!');
        }
        if (aliasNames.includes(newName)) {
            validationErrors.push('An alias with the same name already exists!');
        }
        return validationErrors;
    };

    return (
        <main id="profile">
            <InputPopup
                hidden={searchHidden}
                setHidden={setSearchHidden}
                title="Player search"
                hint="Search for a user or an alias"
                submit={submitSearch}
            />
            <InputPopup
                hidden={newAliasHidden}
                setHidden={setNewAliasHidden}
                title="New alias"
                hint={`Your aliases need to have different names. You can't change an existing alias name, so choose wisely!\nThe name may contain alphanumeric characters or the underscore _ character, and mustn't be longer than 32 characters.`}
                placeholder="enter name here"
                submit={(value) => createNewAlias(value)}
                validate={(value) => validateNewAlias(value)}
            />
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
                                        {profile.since.toDateString()}{' '}
                                        <span className="unit">since</span>
                                    </div>
                                    <div className="user-info__stat">
                                        {formatHours(profile.aliases[selectedAlias].time || 0)}{' '}
                                        <span className="unit">hours</span>
                                    </div>
                                    <div className="user-info__stat">
                                        {profile.aliases[selectedAlias].points}{' '}
                                        <span className="unit">points</span>{' '}
                                        <span className="user-info__rank">( #123 )</span>
                                    </div>
                                    <div className="user-info__stat">
                                        {profile.aliases[selectedAlias].wpm.toFixed(2)}{' '}
                                        <span className="unit">wpm</span>
                                    </div>
                                    <div className="user-info__stat">
                                        {profile.aliases[selectedAlias].accuracy.toFixed(2)}{' '}
                                        <span className="unit">acc</span>
                                    </div>
                                </div>
                            </>
                        </CSSTransition>
                    </TransitionGroup>
                    <div className="user-info__bio">
                        {bioEditorHidden ? (
                            profile.bio
                        ) : (
                            <form onSubmit={() => saveBio()} className="user-info__bio-editor">
                                <textarea
                                    rows={16}
                                    value={bioValue}
                                    onChange={(event) => setBioValue(event.target.value)}
                                />
                                <div className="user-info__bio-editor-actions">
                                    <button
                                        className="button"
                                        type="button"
                                        onClick={() => {
                                            resetBioEditor();
                                        }}
                                    >
                                        Close
                                    </button>
                                    <button className="button" type="submit">
                                        OK
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="user-actions">
                        {sessionData && sessionData.name === profile.name && (
                            <>
                                <button className="button" onClick={() => setNewAliasHidden(false)}>
                                    New alias
                                </button>
                                <button
                                    className="button"
                                    onClick={() => setBioEditorHidden(false)}
                                >
                                    Edit bio
                                </button>
                                <button className="button" onClick={() => logout()}>
                                    Log out
                                </button>
                            </>
                        )}
                    </div>
                    <div className="user-info__expand">
                        <i className="material-icons md-36">expand_more</i>
                    </div>
                </div>
            </section>
            <TransitionGroup component={null}>
                <CSSTransition key={selectedAlias} timeout={300} classNames="new-alias">
                    <section id="top-performances">
                        <span className="container-title">Top performances</span>
                        <div className="performance-container">
                            {profile.aliases[selectedAlias].topPerformances.length ? (
                                profile.aliases[selectedAlias].topPerformances.map((perf, i) => (
                                    <Card
                                        key={i}
                                        cardStyle={perf.rank}
                                        actions={getPerfActions(perf, location, history)}
                                    >
                                        <PerformanceCard {...perf} />
                                    </Card>
                                ))
                            ) : (
                                <div className="no-performances">
                                    You haven't completed any sections yet
                                </div>
                            )}
                        </div>
                    </section>
                </CSSTransition>
            </TransitionGroup>
            <TransitionGroup component={null}>
                <CSSTransition key={selectedAlias} timeout={300} classNames="new-alias">
                    <section id="recent-performances">
                        <span className="container-title">Recent performances</span>
                        <div className="performance-container">
                            {profile.aliases[selectedAlias].recentPerformances.length ? (
                                profile.aliases[selectedAlias].recentPerformances.map((perf, i) => (
                                    <Card
                                        key={i}
                                        cardStyle={perf.rank}
                                        actions={getPerfActions(perf, location, history)}
                                    >
                                        <PerformanceCard {...perf} key={i} />
                                    </Card>
                                ))
                            ) : (
                                <div className="no-performances">
                                    You haven't completed any sections yet
                                </div>
                            )}
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
