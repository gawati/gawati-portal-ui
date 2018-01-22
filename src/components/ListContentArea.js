import React from 'react';
import { Switch, Route } from 'react-router-dom';


import {getRoute} from '../utils/routeshelper';

import ListContentColumn from '../containers/ListContentColumn';
import ListThemeContentColumn from '../containers/ListThemeContentColumn';
import SearchContentColumnYear from '../containers/SearchContentColumnYear';
import SearchContentColumnCountry from '../containers/SearchContentColumnCountry';
import SearchContentColumnLanguage from '../containers/SearchContentColumnLanguage';
import SearchContentColumnSubject from '../containers/SearchContentColumnSubject';
import SearchContentColumnFilter from '../containers/SearchContentColumnFilter';



import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

class ListContentArea extends React.Component{

    render () {
        const { match, i18n } = this.props;
        return (
            <Section>
                <div className="container">
                    <DivRow>
                        <Switch>
                            <Route path={ getRoute('recent') } component={ListContentColumn} />
                            <Route path={ getRoute('themes') } component={ListThemeContentColumn} />
                            <Route path={ getRoute('filter') } component={SearchContentColumnFilter} />
                            <Route path={ getRoute('search-country') } component={SearchContentColumnCountry} />
                            <Route path={ getRoute('search-year') } component={SearchContentColumnYear} />
                            <Route path={ getRoute('search-doclang') } component={SearchContentColumnLanguage} />
                            <Route path={ getRoute('search-keyword') } component={SearchContentColumnSubject} />
                        </Switch>
                        <SideBarColumn  match={match} i18n={ i18n } />
                    </DivRow>
                </div>
            </Section>
        );
    }
    
}

export default ListContentArea;