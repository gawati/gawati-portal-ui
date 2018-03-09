import React from 'react';
import { Switch } from 'react-router-dom';

import {Aux, defaultLang} from '../utils/generalhelper';
import {getRoute} from '../utils/routeshelper';

//import PageUpperBorder from './PageUpperBorder';
import TopBar from './TopBar';
import NoMatch from './NoMatch';
import HomeContentArea from './HomeContentArea';
import DocumentContentArea from './DocumentContentArea';
import ListContentArea from './ListContentArea';
import PageContentArea from './PageContentArea';
import Footer from './Footer';
import { Redirect } from 'react-router'
import {PropsRoute} from '../utils/routeshelper';
import {Helmet} from "react-helmet";

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
         this.slideToggle = this.slideToggle.bind(this);
         this.setCollapsible = this.setCollapsible.bind(this);
    }


    slideToggle() {
        if(this.state.open) {
            this.setState({open: false});
            this.element.style.width = '0px';
        }
        else {
            this.setState({open: true});
            this.element.style.width = '100%';
        }
    };

    setCollapsible = (el) => {
        if (el) {
            this.element = el;
            if(!this.state.open) {
                el.style.width = '0px';
            }
        }
    };

    render() {
        const prod = process.env.NODE_ENV === 'production';
        var css;
        if (prod) {
            css = <Helmet>
                    <link rel="stylesheet" type="text/css" href={`${process.env.PUBLIC_URL}/static/css/themes/${process.env.REACT_APP_THEME}/vars.css`} />
                </Helmet>
        }
        return (
            <Aux>
                {css}
                <Switch>
                    <PropsRoute exact path="/_lang/:lang/:routeName/*" component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                    <Redirect exact from="/" to={`/_lang/${this.props.i18n.language || defaultLang().langUI }/`} component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                    <Redirect exact from="/index.html" to="/_lang/en/"component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                    <PropsRoute path="/_lang/:lang/*" component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                    <PropsRoute path="*" component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                </Switch>
                <Switch>
                    <PropsRoute exact path="/_lang/:lang" component={HomeContentArea}  i18n={this.props.i18n} setCollapsible={this.setCollapsible}/>
                    <PropsRoute path={ getRoute('content') } component={PageContentArea} i18n={this.props.i18n} setCollapsible={this.setCollapsible}/>
                    <PropsRoute path={ getRoute('doc-iri') } component={DocumentContentArea} i18n={this.props.i18n} setCollapsible={this.setCollapsible}/>
                    <PropsRoute path={ getRoute('recent') } component={ListContentArea} i18n={this.props.i18n} setCollapsible={this.setCollapsible}/>
                    <PropsRoute path={ getRoute('themes') } component={ListContentArea} i18n={this.props.i18n} setCollapsible={this.setCollapsible}/>
                    <PropsRoute path={ getRoute('filter') } component={ListContentArea} i18n={this.props.i18n} setCollapsible={this.setCollapsible}/>
                {/* <PropsRoute path={ getRoute('search-country') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('search-year') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('search-doclang') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('search-keyword') } component={ListContentArea} i18n={this.props.i18n} /> */}
                    <PropsRoute component={NoMatch} />
                </Switch>
                <PropsRoute path="*" component={Footer}  i18n={this.props.i18n}  />
            </Aux>
        );
   } 
}


export default Page;