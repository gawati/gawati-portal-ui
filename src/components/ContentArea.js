import React from 'react';
import NotifBar from './NotifBar';
import ContentColumn from './ContentColumn';
import HomeContentColumn from '../containers/HomeContentColumn';
import DocumentContentColumn from '../containers/DocumentContentColumn';
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
                        <Route path="/document.html/:expressionIri" component={DocumentContentColumn} />
                    </Switch>
                    <SideBarColumn />
                </DivRow>
            </div>
        </Section>
    );
}

export default ContentArea;