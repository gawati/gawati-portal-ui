import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotifBar from './NotifBar';
import ListContentColumn from '../containers/ListContentColumn';
import ListThemeContentColumn from '../containers/ListThemeContentColumn';
import SearchContentColumn from '../containers/SearchContentColumn';

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
                        <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bycountry/:country*" component={SearchContentColumn} />
                        <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_byyear/:year*" component={SearchContentColumn} />
                        <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bylang/:lang*" component={SearchContentColumn} />
                        <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bysubject/:subject*" component={SearchContentColumn} />
                    </Switch>
                    <SideBarColumn  />
                </DivRow>
            </div>
        </Section>
    );
}

export default ListContentArea;