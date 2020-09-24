import React from 'react';
import './Radio.css';

interface RadioProps {
    values: string[];
    selected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const Radio = ({ values, selected, setSelected }: RadioProps) => {
    return (
        <>
            {values.map((value, i) => (
                <button
                    key={i}
                    onClick={() => {
                        setSelected(i);
                    }}
                    className={[
                        'radio',
                        i === selected ? 'radio-active' : '',
                    ].join(' ')}
                >
                    {value}
                </button>
            ))}
        </>
    );
};

export default Radio;
