import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Aux} from '../utils/generalhelper';
import {getRoute} from '../utils/routeshelper';

//import PageUpperBorder from './PageUpperBorder';
import TopBar from './TopBar';
import HomeContentArea from './HomeContentArea';
import DocumentContentArea from './DocumentContentArea';
import ListContentArea from './ListContentArea';
import Footer from './Footer';

import {PropsRoute} from '../utils/routeshelper';

class Page extends React.Component {

   constructor(props) {
       super(props);
       console.log( " PROPS PAGE ", props);
   } 

   render() {
        return (
            <Aux>

                <PropsRoute path="*" component={TopBar} i18n={this.props.i18n} />
                <Switch>
                    <Route exact path="/" component={HomeContentArea} />
                    <Route exact path="/index.html" component={HomeContentArea} />
                    <Route path={ getRoute('doc-iri') } component={DocumentContentArea} />
                    <Route path={ getRoute('recent') } component={ListContentArea} />
                    <Route path={ getRoute('themes') } component={ListContentArea} />
                    <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/json/:search" component={ListContentArea} />
                    <Route path={ getRoute('search-country') } component={ListContentArea} />
                    <Route path={ getRoute('search-year') } component={ListContentArea} />
                    <Route path={ getRoute('search-doclang') } component={ListContentArea} />
                    <Route path={ getRoute('search-keyword') } component={ListContentArea} />
                </Switch>
                <Route path="*" component={Footer} />
            </Aux>
        );
   } 
}


export default Page;