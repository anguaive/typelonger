import React from 'react';
import { useLocation } from 'react-router-dom';

const NoMatch = () => {
    const location = useLocation();

    return <div>No match for {location.pathname}</div>;
};

export default NoMatch;
