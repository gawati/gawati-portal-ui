import React from 'react';
import { Switch, Route } from 'react-router-dom';


import NotifBar from './NotifBar';
import {getRoute} from '../utils/routeshelper';

import ListContentColumn from '../containers/ListContentColumn';
import ListThemeContentColumn from '../containers/ListThemeContentColumn';
import SearchContentColumnYear from '../containers/SearchContentColumnYear';
import SearchContentColumnCountry from '../containers/SearchContentColumnCountry';
import SearchContentColumnLanguage from '../containers/SearchContentColumnLanguage';
import SearchContentColumnSubject from '../containers/SearchContentColumnSubject';



import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

class ListContentArea extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <Section>
                <div className="container">
                    <DivRow>
                        <NotifBar />
                        <Switch>
                            <Route path={ getRoute('recent') } component={ListContentColumn} />
                            <Route path={ getRoute('themes') } component={ListThemeContentColumn} />
                            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/json/:search" component={SearchContentColumnCountry} />
                            <Route path={ getRoute('search-country') } component={SearchContentColumnCountry} />
                            <Route path={ getRoute('search-year') } component={SearchContentColumnYear} />
                            <Route path={ getRoute('search-doclang') } component={SearchContentColumnLanguage} />
                            <Route path={ getRoute('search-keyword') } component={SearchContentColumnSubject} />
                        </Switch>
                        <SideBarColumn  match={this.props.match}/>
                    </DivRow>
                </div>
            </Section>
        );
    }
    
}

export default ListContentArea;