import React from 'react';

import NotifBar from './NotifBar';
import DocumentContentColumn from '../containers/DocumentContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

class DocumentContentArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Section>
                <div className="container">
                    <DivRow>
                        <NotifBar />
                        <DocumentContentColumn match={this.props.match} />
                        <SideBarColumn  match={this.props.match}/>
                    </DivRow>
                </div>
            </Section>
        );
    }
    
}

export default DocumentContentArea;