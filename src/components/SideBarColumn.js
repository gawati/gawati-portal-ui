import React from 'react';
import Filter from '../containers/filter/Filter';

class SideBarColumn extends React.Component{


    render() {
        return (
            <div className={ `right col-3` }>
                <div className={ `w-clearfix white-wrapper` }>
                    <Filter match={this.props.match} />
                    <p className="cc-law-libray">The African Law Library</p>
                </div>
            </div>
        );
    }
}

export default SideBarColumn;

