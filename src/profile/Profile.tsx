import React from 'react';
import './Profile.css';

interface Performance {
    title: string;
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
    username: string;
    picture: string;
    since: Date;
    aliases: Alias[];
    bio: string;
}

const Profile = () => {
    return (
        <main id="profile">
            <section id="user-info">
                <span className="container-title">User information</span>
                <div className="container flex-row">
                    <img
                        src="https://www.eatliver.com/wp-content/uploads/2019/01/tank-cat10.jpg"
                        className="user-info__picture"
                        alt="User"
                    />
                    <div className="user-info__stuff">
                        <div className="user-info__names">
                            <div className="user-info__username">Username</div>
                            <div className="user-info__aliases">
                                <div className="user-info__alias">Username</div>
                                <div className="user-info__alias">
                                    Username_QWERTY
                                </div>
                                <div className="user-info__alias alias-active">
                                    Username_123
                                </div>
                            </div>
                        </div>
                        <div className="user-info__stats">
                            <div className="user-info__stat">
                                2020-09-02 <span className="unit">since</span>
                            </div>
                            <div className="user-info__stat">
                                3.56 <span className="unit">hours</span>
                            </div>
                            <br />
                            <div className="user-info__stat">
                                834 <span className="unit">points</span> ( #323
                                )
                            </div>
                            <br />
                            <div className="user-info__stat">
                                102.32 <span className="unit">wpm</span>
                            </div>
                            <div className="user-info__stat">
                                99.12 <span className="unit">acc</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="top-performances">
                <span className="container-title">Top performances</span>
                <div className="container"></div>
            </section>
            <section id="recent-performances">
                <span className="container-title">Recent performances</span>
                <div className="container"></div>
            </section>
            <section id="performance-graph">
                <span className="container-title">Performance graph</span>
                <div className="container"></div>
            </section>
        </main>
    );
};

export default Profile;
