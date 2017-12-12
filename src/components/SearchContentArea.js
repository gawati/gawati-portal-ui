import React from 'react';

import NotifBar from './NotifBar';
import SearchContentColumnYear from '../containers/SearchContentColumnYear';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

function SearchContentArea({ match }) {
    return (
        <Section>
            <div className="container">
                <DivRow>
                    <NotifBar />
                    <SearchContentColumnYear match={match} />
                    <SideBarColumn  />
                </DivRow>
            </div>
        </Section>
    );
}

export default SearchContentArea;