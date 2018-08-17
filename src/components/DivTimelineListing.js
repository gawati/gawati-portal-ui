import React from 'react';
import FBComments from './FBComments.js';

class DivTimelineListing extends React.Component {

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
            <div className="search-result">
                {this.props.children}
                {
                    <FBComments lang={this.state.lang}/>
                }
            </div>
        );
    }
}

export default DivTimelineListing;