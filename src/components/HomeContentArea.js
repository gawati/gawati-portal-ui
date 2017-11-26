import React from 'react';

import NotifBar from './NotifBar';
import HomeContentColumn from '../containers/HomeContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

function HomeContentArea() {
    return (
        <Section>
            <div className="container">
                <DivRow altClasses="home-content-area">
                    <NotifBar />
                    <HomeContentColumn />
                    <SideBarColumn />
                </DivRow>
            </div>
        </Section>
    );
}

export default HomeContentArea;