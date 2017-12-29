
import React from 'react';

const DivListing = ({children}) =>
    <div className={ `left col-9`}>
        <div className="search-result">
        {children}
        </div>
    </div>
    ;

export default DivListing;