import React, { useState, useEffect } from 'react';
import './Profile.css';
import { ReactComponent as ExpandIcon } from '../res/chevron-circle-down.svg';

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
        <main id="profile">
            <section id="user-info">
                <span className="container-title">User information</span>
                <div id="user-info-grid" className="container">
                    <img
                        src="https://www.eatliver.com/wp-content/uploads/2019/01/tank-cat10.jpg"
                        className="user-info__picture"
                        alt="User"
                    />
                    <div className="user-info__username">Username</div>
                    <div className="user-info__aliases">
                        <div className="user-info__alias">Username</div>
                        <div className="user-info__alias">Username_QWERTY</div>
                        <div className="user-info__alias alias-active">
                            Username_123
                        </div>
                    </div>
                    <div className="user-info__stats">
                        <div className="user-info__stat">
                            2020-09-02 <span className="unit">since</span>
                        </div>
                        <div className="user-info__stat">
                            3.56 <span className="unit">hours</span>
                        </div>
                        <div className="user-info__stat">
                            834 <span className="unit">points</span> ( #323 )
                        </div>
                        <div className="user-info__stat">
                            102.32 <span className="unit">wpm</span>
                        </div>
                        <div className="user-info__stat">
                            99.12 <span className="unit">acc</span>
                        </div>
                    </div>
                    <div className="user-info__bio">
                        <strong>Hello there! I'm Username.</strong>
                        <br />
                        <br />
                        Rina istorlle sinome amin uuma malia lle vesta
                        Astalderea. Amin vasa lle sinta lema ed' ando en' templa
                        Dinaerea Narvinye. Silmataurea ho yala onna en' kemen
                        lle ume quel. Yala onna en' vilya tenna' tul're san'
                        poika tuulo' 'kshapsae Hallaerea. Menelya aman tel'
                        seldarine Yaaraerea ro. Tanka tel' taurnin Morsul Alduya
                        Nadorhuanrim. Seasamin Laara'tincoras Unguerea amin uuma
                        malia. Tenna' ento lye omenta tessa sina ten' amin malia
                        ten' vasa quel fara. Amin uuma malia cormamin niuve
                        tenna' ta elea lle au' Tulien Faradome.
                        <br />
                        <br />
                        I'quelin Mori'Quessier naa ba Mori'Quessir nurta i' fea
                        amin uuma malia cormlle naa tanya tel'raa. Ta naa
                        seasamin neuma en' templa tenna' tul're san' tanka tel'
                        taurnin. Usquenerea Dina faina templa amin weera yassen
                        lle. Mani uma lle merna ten' ta Elandili Cairbara
                        Mith'quessir. Dina quel undome Naugrim asca melloneamin.
                        Naugiaur tua amin! re Agaryulnaerea.
                    </div>

                    <div className="user-info__expand">
                        <ExpandIcon />
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
                <div className="container red"></div>
            </section>
        </main>
    );
};

export default Profile;
