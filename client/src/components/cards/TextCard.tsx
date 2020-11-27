import React from 'react';
import './TextCard.css';
import {TextListView} from '../../utils/types';

const TextCard = ({ text }: { text: TextListView }) => {
    return (
        <>
            <div className="text-card__title">{text.title}</div>
            <div className="text-card__author">by {text.author}</div>
            <div className="text-card__stats-container">
                <div className="text-card__genres">
                    {text.genres.map((genre, i) => (
                        <div key={i}>{genre}</div>
                    ))}
                </div>
                <div>
                    {text.popularity || 0}
                    <span className="unit">popularity</span>
                </div>
                <div>
                    {text.sectionCount || 0}
                    <span className="unit">sections</span>
                </div>
                <div>
                    {Math.round(text.length / 5) || 0}
                    <span className="unit">words</span>
                </div>
            </div>
        </>
    );
};

export default TextCard;
