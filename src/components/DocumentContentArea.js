import React from 'react';

import DocumentContentColumn from '../containers/DocumentContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

function DocumentContentArea({ match, setCollapsible, slideToggle }) {
    return (
        <Section>
            <div className="container-fluid">
                <DivRow>
                    <DocumentContentColumn match={match} />
                    <SideBarColumn match={match} setCollapsible={setCollapsible} slideToggle={slideToggle}/>
                </DivRow>
            </div>
        </Section>
    );
}

export default DocumentContentArea;
