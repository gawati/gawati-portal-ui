import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotifBar from './NotifBar';
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
                            <Route path="/recent/_lang/:lang/_count/:count/_from/:from/_to/:to" component={ListContentColumn} />
                            <Route path="/themes/_lang/:lang/_themes/:themes/_count/:count/_from/:from/_to/:to" component={ListThemeContentColumn} />
                            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/json/:search" component={SearchContentColumnCountry} />
                            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bycountry/:country" component={SearchContentColumnCountry} />
                            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_byyear/:year*" component={SearchContentColumnYear} />
                            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bylang/:doclang*" component={SearchContentColumnLanguage} />
                            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bysubject/:kw*" component={SearchContentColumnSubject} />
                        </Switch>
                        <SideBarColumn  match={this.props.match}/>
                    </DivRow>
                </div>
            </Section>
        );
    }
    
}

export default ListContentArea;