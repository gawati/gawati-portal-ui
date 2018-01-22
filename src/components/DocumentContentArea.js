import React from 'react';

import DocumentContentColumn from '../containers/DocumentContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

function DocumentContentArea({ match }) {
    return (
        <Section>
            <div className="container">
                <DivRow>
                    <DocumentContentColumn match={match} />
                    <SideBarColumn match={match} />
                </DivRow>
            </div>
        </Section>
    );
}

export default DocumentContentArea;
