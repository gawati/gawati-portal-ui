
import React from 'react';

const DivListing = ({children}) =>
    <div className={ `left col-xs-12 col-lg-9 col-md-9 col-sm-12`}>
        <div className="search-result">
        {children}
        </div>
    </div>
    ;

export default DivListing;