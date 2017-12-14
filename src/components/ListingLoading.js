import React from 'react';
import GwSpinner from './GwSpinner';
const ListingLoading = ({children}) => {
        return (
            <div className={ `left col-9`}>
            <div className="search-result">
                {children}
                <GwSpinner />
            </div>
            </div>
        );
    };

export default ListingLoading;
