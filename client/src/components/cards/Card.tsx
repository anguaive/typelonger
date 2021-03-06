import React, { ReactNode, useState } from 'react';
import { Action } from '../../utils/utils';
import './Card.css';

const Card = ({
    children,
    actions,
    cardStyle,
    selected,
}: {
    children: ReactNode;
    actions?: Action[];
    cardStyle?: string;
    selected?: boolean;
}) => {
    const [displayActions, setDisplayActions] = useState<boolean>(false);

    return (
        <div
            className={['card', cardStyle || 'normal'].join(' ')}
            onMouseEnter={() => actions && setDisplayActions(true)}
            onMouseLeave={() => actions && setDisplayActions(false)}
        >
            <div
                className={[
                    'card-animation',
                    selected ? 'card-selected' : null,
                ].join(' ')}
            >
                <div
                    className={[
                        'card-layout',
                        displayActions ? 'invis' : null,
                    ].join(' ')}
                >
                    {children}
                </div>
            </div>
            <div
                className={[
                    'card-actions',
                    displayActions ? null : 'invis',
                ].join(' ')}
            >
                {actions
                    ? actions.map((action, i) => (
                          <button
                              className="button"
                              key={i}
                              onClick={() => action.handler()}
                          >
                              {action.text}
                          </button>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default Card;
