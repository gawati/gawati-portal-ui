import React from 'react';

import NotifBar from './NotifBar';
import ListContentColumn from '../containers/ListContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

function ListContentArea({ match }) {
    return (
        <Section>
            <div className="container">
                <DivRow>
                    <NotifBar />
                    <ListContentColumn match={match} />
                    <SideBarColumn  />
                </DivRow>
            </div>
        </Section>
    );
}

export default ListContentArea;