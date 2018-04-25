import React from 'react';
import GwSpinner from './GwSpinner';
import DivTimelineListing from './DivTimelineListing';

const TimelineListingLoading = ({children}) => {
        return (
            <DivTimelineListing>
                {children}
                <GwSpinner />
            </DivTimelineListing>
        );
    };

export default TimelineListingLoading;
