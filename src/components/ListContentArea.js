import React from 'react';
import { Switch, Route } from 'react-router-dom';


import {getRoute} from '../utils/routeshelper';

import ListContentColumn from '../containers/ListContentColumn';
import ListThemeContentColumn from '../containers/ListThemeContentColumn';
import SearchContentColumnFilter from '../containers/SearchContentColumnFilter';



import SideBarColumn from './SideBarColumn';
import Section from './Section';

class ListContentArea extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            el: null,
            flexDirection: null
        };
        this.setFlexDirection = this.setFlexDirection.bind(this);
    }


    setFlexDirection = (el) => {
        if (el) {
            this.el = el;
        }
    }

    componentDidMount = () => {
        if (this.el) {
            this.setState({'flexDirection': window.getComputedStyle(this.el,null).flexDirection});
        debugger;
        }
    }

    render () {
        const { match, i18n } = this.props;
        return (
            <Section setFlexDirection={this.setFlexDirection}>
                <Switch>
                    <Route path={ getRoute('recent') } component={ListContentColumn} />
                    <Route path={ getRoute('themes') } component={ListThemeContentColumn} />
                    <Route path={ getRoute('filter') } component={SearchContentColumnFilter} />
                </Switch>
                <SideBarColumn  match={match} i18n={ i18n } setCollapsible={this.props.setCollapsible} slideToggle={this.props.slideToggle} flexDirection={this.state.flexDirection}/>
            </Section>
        );
    }
    
}

export default ListContentArea;