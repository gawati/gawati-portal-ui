import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotifBar from './NotifBar';
import ListContentColumn from '../containers/ListContentColumn';
import ListThemeContentColumn from '../containers/ListThemeContentColumn';

import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

function ListContentArea({ match }) {
    return (
        <Section>
            <div className="container">
                <DivRow>
                    <NotifBar />
                    <Switch>
                        <Route path="/recent/_lang/:lang/_count/:count/_from/:from/_to/:to" component={ListContentColumn} />
                        <Route path="/themes/_lang/:lang/_themes/:themes/_count/:count/_from/:from/_to/:to" component={ListThemeContentColumn} />
                    </Switch>
                    <SideBarColumn  />
                </DivRow>
            </div>
        </Section>
    );
}

export default ListContentArea;