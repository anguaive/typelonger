import React, {useState, useEffect, useContext} from 'react';
import {useLocation, useHistory, useParams} from 'react-router-dom';
import './Profile.css';
import {formatHours} from '../../utils/utils';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PerformanceCard from '../cards/PerformanceCard';
import Radio from '../radio/Radio';
import {User, SessionData} from '../../utils/types';
import {getPerfActions} from '../../utils/utils';
import Card from '../cards/Card';
import InputPopup from '../input-popup/InputPopup';
import {getProfile, postAlias, patchUser} from '../../utils/dbservice';
import {SessionContext, logout} from '../../utils/auth';

interface ProfileProps {
    searchHidden: boolean;
    setSearchHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile = ({searchHidden, setSearchHidden}: ProfileProps) => {
    const [profile, setProfile] = useState<User>();
    const [bioEditorHidden, setBioEditorHidden] = useState(true);
    const [newAliasHidden, setNewAliasHidden] = useState(true);
    const {sessionData, setSessionData} = useContext(SessionContext);
    const location = useLocation();
    const history = useHistory();
    const {username} = useParams();

    const handleLogout = () => {
        if (setSessionData) {
            setSessionData({name: '', aliasId: -1});
        }
        logout();
        history.push('/');
    }

    useEffect(() => {
        if (username) {
            getProfile(username)
                .then((data) => {
                    if (data) {
                        console.log(data);
                        setProfile({...data});
                    }
                });
        }
    }, [username]);

    if (profile === undefined) {
        return (
            <div>User not found!</div>
        )
    }

    let selectedAliasId = sessionData ? sessionData.aliasId : profile.aliases[0].id;
    let selectedAlias = profile.aliases.find(alias => alias.id === selectedAliasId) || profile.aliases[0];
    let isOwnProfile = sessionData && sessionData.name === profile.name;

    const handleSelectAlias = (aliasId: number) => {
        if (sessionData && setSessionData) {
            setSessionData({...sessionData, aliasId: profile.aliases[aliasId].id});
        }
        if (isOwnProfile) {
            patchUser(profile.name, {selectedAliasId: profile.aliases[aliasId].id})
                .catch(error => console.log(error));
        }
    }

    const createNewAlias = (newName: string) => {
        postAlias(newName)
            .then(newAlias => {
                let newProfile = {...profile};
                newProfile.aliases.push(newAlias);
                setProfile(newProfile);
            });
    };

    const submitSearch = (value: string) => {
    };

    const resetBioEditor = () => {
        setProfile({...profile, biography: ''});
        setBioEditorHidden(true);
    };

    const saveBio = () => {
        patchUser(profile.name, {biography: profile.biography});
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
                    <img src={profile.picture} className="user-info__picture" alt="User"/>
                    <div className="user-info__username">{profile.name}</div>
                    <div className="user-info__aliases">
                        <Radio
                            values={profile.aliases.map(alias => alias.name)}
                            selected={profile.aliases.indexOf(selectedAlias)}
                            setSelected={handleSelectAlias}
                        />
                    </div>
                    <TransitionGroup component={null}>
                        <CSSTransition key={selectedAliasId} timeout={300} classNames="new-alias">
                            <>
                                <div className="user-info__stats">
                                    <div className="user-info__stat">
                                        {formatHours(selectedAlias.time || 0)}{' '}
                                        <span className="unit">hours</span>
                                    </div>
                                    <div className="user-info__stat">
                                        {selectedAlias.points}{' '}
                                        <span className="unit">points</span>{' '}
                                    </div>
                                    <div className="user-info__stat">
                                        {selectedAlias.wpm.toFixed(2)}{' '}
                                        <span className="unit">wpm</span>
                                    </div>
                                    <div className="user-info__stat">
                                        {selectedAlias.accuracy.toFixed(2)}{' '}
                                        <span className="unit">acc</span>
                                    </div>
                                </div>
                            </>
                        </CSSTransition>
                    </TransitionGroup>
                    <div className="user-info__bio">
                        {bioEditorHidden ? (
                            profile.biography
                        ) : (
                            <form onSubmit={() => saveBio()} className="user-info__bio-editor">
                                <textarea
                                    rows={16}
                                    value={profile.biography}
                                    onChange={(event) => setProfile({...profile, biography: event.target.value})}
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
                        {isOwnProfile && (
                            <div className="user-actions__buttons">
                                <button className="button" onClick={() => setNewAliasHidden(false)}>
                                    New alias
                                </button>
                                <button
                                    className="button"
                                    onClick={() => setBioEditorHidden(false)}
                                >
                                    Edit bio
                                </button>
                                <button className="button" onClick={() => handleLogout()}>
                                    Log out
                                </button>
                            </div>
                        )}
                        <div className="user-actions__registration-date">
                            since {new Date(profile.dateOfRegistration).toDateString()}
                        </div>
                    </div>
                    <div className="user-info__expand">
                        <i className="material-icons md-36">expand_more</i>
                    </div>
                </div>
            </section>
            <TransitionGroup component={null}>
                <CSSTransition key={selectedAliasId} timeout={300} classNames="new-alias">
                    <section id="top-performances">
                        <span className="container-title">Top performances</span>
                        <div className="performance-container">
                            {selectedAlias.topPerformances && selectedAlias.topPerformances.length ? (
                                selectedAlias.topPerformances.map((perf, i) => (
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
                <CSSTransition key={selectedAliasId} timeout={300} classNames="new-alias">
                    <section id="recent-performances">
                        <span className="container-title">Recent performances</span>
                        <div className="performance-container">
                            {selectedAlias.recentPerformances && selectedAlias.recentPerformances.length ? (
                                selectedAlias.recentPerformances.map((perf, i) => (
                                    <Card
                                        key={i}
                                        cardStyle={perf.rank}
                                        actions={getPerfActions(perf, location, history)}
                                    >
                                        <PerformanceCard {...perf} key={i}/>
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
