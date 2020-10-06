import React, { useState, useEffect } from 'react';
import PerformanceCard from '../profile/PerformanceCard';
import './TextDetails.css';
import { Text } from '../scheme';

const TextDetails = () => {
    const [text, setText] = useState<Text>();
    const [selectedSection, setSelectedSection] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/texts')
            .then((response) => response.json())
            .then((data) => {
                setText(data[0]);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (text === undefined) {
        return null;
    }

    return (
        <main id="text-details">
            <section id="text-info">
                <span className="container-title">Text information</span>
                <div id="text-info-grid" className="container">
                    <div className="text-info__title">{text.title}</div>
                    <img
                        src={text.coverPicture}
                        className="text-info__cover-picture"
                        alt="Text"
                    />
                    <div className="text-info__author">by {text.author}</div>
                    <div className="text-info__genre">{text.genre}</div>
                    <div className="text-info__isbn">ISBN {text.isbn}</div>
                    <div className="text-info__stats">
                        <div className="text-info__popularity">
                            {text.popularity}{' '}
                            <span className="unit">popularity</span>
                        </div>
                        <div className="text-info__word-count">
                            {text.sections
                                .map((section) => section.length)
                                .reduce((acc, curr) => acc + curr)}{' '}
                            <span className="unit">words</span>
                        </div>
                        <div className="text-info__sections-count">
                            {text.sections.length}{' '}
                            <span className="unit">sections</span>
                        </div>
                    </div>
                    <div className="text-info__dates">
                        <div className="text-info__date-of-creation">
                            {new Date(text.dateOfCreation).toDateString()}{' '}
                            <span className="unit">creation</span>
                        </div>
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
                        <div
                            className={[
                                'section',
                                selectedSection === i
                                    ? 'section-selected'
                                    : null,
                            ].join(' ')}
                            onClick={() => setSelectedSection(i)}
                        >
                            <div className="section__title">
                                {section.title}
                            </div>
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
                        </div>
                    ))}
                </div>
            </section>
            <section id="text-best-performances">
                <span className="container-title">Best Performances</span>
                <div className="performance-container">
                    {text.sections[selectedSection].topPerformances ? (
                        text.sections[
                            selectedSection
                        ].topPerformances!.map((perf, i) => (
                            <PerformanceCard {...perf} key={i} />
                        ))
                    ) : (
                        <div className="no-performances">
                            This section has no performances
                        </div>
                    )}
                </div>
            </section>
            <section id="your-best-performances">
                <span className="container-title">Your best performance</span>
                <div className="performance-container">
                    {text.sections[selectedSection].ownTopPerformance ? (
                        <PerformanceCard
                            {...text.sections[selectedSection]
                                .ownTopPerformance!}
                        />
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