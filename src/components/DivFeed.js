
import React from 'react';

function DivFeed({children}) {
    return (
        <div className={ `feed w-clearfix` }>
            { children }
        </div>
    );
}

export default DivFeed;

