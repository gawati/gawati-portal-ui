import React from 'react';
import { Switch } from 'react-router-dom';

import {Aux} from '../utils/generalhelper';
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

class Page extends React.Component {

   render() {
        return (
            <Aux>
                <Switch>
                    <PropsRoute exact path="/:routeName/_lang/:lang/*" component={TopBar} i18n={this.props.i18n} />
                    <Redirect exact from="/" to="/index.html"component={TopBar} i18n={this.props.i18n} />
                    <PropsRoute component={TopBar} i18n={this.props.i18n} />
                </Switch>
                <Switch>
                    <PropsRoute exact path="/" component={HomeContentArea}  i18n={this.props.i18n} />
                    <PropsRoute exact path="/index.html" component={HomeContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('content') } component={PageContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('doc-iri') } component={DocumentContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('recent') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('themes') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('filter') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('search-country') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('search-year') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('search-doclang') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('search-keyword') } component={ListContentArea} i18n={this.props.i18n} />
                    <PropsRoute component={NoMatch} />
                </Switch>
                <PropsRoute path="*" component={Footer}  i18n={this.props.i18n}  />
            </Aux>
        );
   } 
}


export default Page;