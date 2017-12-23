import React from 'react';
import Filter from '../containers/filter/Filter';

class SideBarColumn extends React.Component {
    
/*     constructor(props) {
        super(props);
    } */

    render() {
        return (
            <div className={ `right col-3` }>
                <div className={ `w-clearfix white-wrapper` }>
                    <Filter />
                    <p className="cc-law-libray">The African Law Library</p>
                </div>
            </div>
        );
    }
}

export default SideBarColumn;

