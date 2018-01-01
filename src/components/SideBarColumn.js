import React from 'react';
import Filter from '../containers/filter/Filter2';

class SideBarColumn extends React.Component{

    render() {
        const {match, i18n} = this.props;
        console.log( " SIDEBAR i18n", i18n);
        return (
            <div className={ `right col-3` }>
                <div className={ `w-clearfix white-wrapper` }>
                    <Filter match={ match } i18n={ i18n } />
                    <p className="cc-law-libray">The African Law Library</p>
                </div>
            </div>
        );
    }
}

export default SideBarColumn;

