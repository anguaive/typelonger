import React, {useState, useEffect, useContext} from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import PerformanceCard from '../cards/PerformanceCard';
import Card from '../cards/Card';
import './TextDetails.css';
import { Text } from '../../utils/types';
import { getPerfActions } from '../../utils/utils';
import { getText } from '../../utils/dbservice';
import {SessionContext} from "../../utils/auth";

const TextDetails = () => {
    const [text, setText] = useState<Text>();
    const {sessionData, setSessionData} = useContext(SessionContext);
    const [selectedSection, setSelectedSection] = useState(0);
    const location = useLocation();
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        getText(id)
            .then(data => {console.log(data);setText(data)});

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (text === undefined) {
        return null;
    }

    const handleSectionPlay = (sectionId: number) => {
        history.push(`/game/${sectionId}`);
    }


    // const ownTopPerf = text.sections[selectedSection].ownTopPerformance;
    const ownTopPerf = null;

    return (
        <main id="text-details">
            <section id="text-info">
                <span className="container-title">Text information</span>
                <div id="text-info-grid" className="container">
                    <div className="text-info__title">{text.title}</div>
                    <img src={text.coverURL} className="text-info__cover-picture" alt="Text" />
                    <div className="text-info__author">by {text.author}</div>
                    {/*<div className="text-info__genre">{text.genre}</div>*/}
                    <div className="text-info__isbn">ISBN {text.isbn}</div>
                    <div className="text-info__stats">
                        <div className="text-info__popularity">
                            {text.popularity || 0} <span className="unit">popularity</span>
                        </div>
                        <div className="text-info__word-count">
                            {text.sections
                                .map((section) => section.length)
                                .reduce((acc, curr) => acc + curr)}{' '}
                            <span className="unit">words</span>
                        </div>
                        <div className="text-info__sections-count">
                            {text.sections.length} <span className="unit">sections</span>
                        </div>
                    </div>
                    <div className="text-info__dates">
                        <div className="text-info__date-of-upload">
                            {new Date(text.dateOfUpload).toDateString()}{' '}
                            <span className="unit">upload</span>
                        </div>
                    </div>
                </div>
            </section>
            <section id="text-sections">
                <span className="container-title">Sections</span>
                <div className="section-container">
                    {text.sections.map((section, i) => (
                        <Card
                            key={i}
                            cardStyle={text.sections[i].ownTopPerformance ? 'normal' : 'inactive'}
                            selected={i === selectedSection}
                            actions={[
                                {
                                    text: 'View details',
                                    handler: () => setSelectedSection(i),
                                },
                                { text: 'To lobby', handler: () => {} },
                                { text: 'Play', handler: () => {handleSectionPlay(section.id)} },
                            ]}
                        >
                            <div className="section__title">{section.title}</div>
                            <div className="section__stats-container">
                                <div>
                                    {section.length}
                                    <span className="unit">words</span>
                                </div>
                                <div>
                                    {section.difficulty}
                                    <span className="unit">difficulty</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
            <section id="text-best-performances">
                <span className="container-title">Best Performances</span>
                <div className="performance-container">
                    {text.sections[selectedSection].topPerformances ? (
                        text.sections[selectedSection].topPerformances!.map((perf, i) => (
                        <Card
                                key={i}
                                cardStyle={perf.rank}
                                actions={getPerfActions(perf, location, history)}
                            >
                                <PerformanceCard {...perf} />
                            </Card>
                        ))
                    ) : (
                        <div className="no-performances">This section has no performances</div>
                    )}
                </div>
            </section>
            <section id="your-best-performances">
                <span className="container-title">Your best performance</span>
                <div className="performance-container">
                    {ownTopPerf ? (
                        <Card
                            // cardStyle={ownTopPerf.rank}
                            cardStyle={"gold"}
                            actions={getPerfActions(ownTopPerf, location, history)}
                        >
                            <PerformanceCard {...ownTopPerf} />
                        </Card>
                    ) : (
                        <div className="no-performances">
                            You haven't completed this section yet
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default TextDetails;
