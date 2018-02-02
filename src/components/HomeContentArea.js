import React from 'react';

import NotifBar from './NotifBar';
import HomeContentColumn from '../containers/HomeContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

class HomeContentArea extends React.Component {

    render() {
        const {match} = this.props;
        return (
            <Section>
                <div className="container-fluid">
                    <DivRow altClasses="home-content-area">
                        <NotifBar />
                        <HomeContentColumn />
                        <SideBarColumn match={match}/>
                    </DivRow>
                </div>
            </Section>
        );
    
    }
}

export default HomeContentArea;