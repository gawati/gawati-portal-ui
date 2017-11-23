import React from 'react';
import NotifBar from './NotifBar';
import ContentColumn from './ContentColumn';
import HomeContentColumn from './HomeContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';
import { Switch, Route } from 'react-router-dom';

function ContentArea() {
    return (
        <Section>
            <div className="container">
                <DivRow altClasses="home-content-area">
                    <NotifBar />
                    <Switch>
                        <Route exact path="/" component={HomeContentColumn} />
                        <Route exact path="/index.html" component={HomeContentColumn} />
                        <Route path="/other.html" component={ContentColumn} />
                    </Switch>
                    <SideBarColumn />
                </DivRow>
            </div>
        </Section>
    );
}

export default ContentArea;