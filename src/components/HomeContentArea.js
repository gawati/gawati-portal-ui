import React from 'react';

import NotifBar from './NotifBar';
import HomeContentColumn from '../containers/HomeContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

class HomeContentArea extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <Section>
                <div className="container">
                    <DivRow altClasses="home-content-area">
                        <NotifBar />
                        <HomeContentColumn />
                        <SideBarColumn match={this.props.match}/>
                    </DivRow>
                </div>
            </Section>
        );
    }
    
}

export default HomeContentArea;