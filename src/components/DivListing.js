import React from 'react';
import FBComments from './FBComments.js';

class DivListing extends React.Component {

    constructor (props) {
        super();
        this.state = {lang: props.lang};
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.lang !== this.state.lang) {
            this.setState({"lang": nextProps.lang});
        }
    }


    render () {
        return (
            <div className={ `main-col col-xs-12 col-lg-9 col-md-9 col-sm-12`}>
                <div className="search-result">
                {this.props.children}
                {
                    <FBComments lang={this.state.lang}/>
                }
                </div>
            </div>
        );
    }
}

export default DivListing;