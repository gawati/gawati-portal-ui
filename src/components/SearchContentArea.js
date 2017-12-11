import React from 'react';

import NotifBar from './NotifBar';
import SearchContentColumn from '../containers/SearchContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

function SearchContentArea({ match }) {
    return (
        <Section>
            <div className="container">
                <DivRow>
                    <NotifBar />
                    <SearchContentColumn match={match} />
                    <SideBarColumn  />
                </DivRow>
            </div>
        </Section>
    );
}

export default SearchContentArea;