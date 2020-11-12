import React from 'react';
import './TextCard.css';
import { Text } from '../types';

const TextCard = ({ text }: { text: Text }) => {
    return (
        <>
            <div className="text-card__title">{text.title}</div>
            <div className="text-card__author">by {text.author}</div>
            <div className="text-card__stats-container">
                <div className="text-card__genres">
                    {text.genre.split('|').map((genre, i) => (
                        <div key={i}>{genre}</div>
                    ))}
                </div>
                <div>
                    {text.popularity}
                    <span className="unit">popularity</span>
                </div>
                <div>
                    {text.sections ? text.sections.length : 1}
                    <span className="unit">sections</span>
                </div>
                <div>
                    {text.sections
                        ? text.sections
                              .map((section) => section.length)
                              .reduce((acc, current) => acc + current)
                        : 123}
                    <span className="unit">words</span>
                </div>
            </div>
        </>
    );
};

export default TextCard;
