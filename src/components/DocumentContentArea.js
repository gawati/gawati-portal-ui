import React from 'react';

import NotifBar from './NotifBar';
import DocumentContentColumn from '../containers/DocumentContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

function DocumentContentArea({ match }) {
    return (
        <Section>
            <div className="container">
                <DivRow>
                    <NotifBar />
                    <DocumentContentColumn match={match} />
                    <SideBarColumn match={match} />
                </DivRow>
            </div>
        </Section>
    );
}

export default DocumentContentArea;
