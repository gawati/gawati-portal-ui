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

function Page(){
   return (
    <Aux>
        <Route path="*" component={TopBar} />
        <Switch>
            <Route exact path="/" component={HomeContentArea} />
            <Route exact path="/index.html" component={HomeContentArea} />
            <Route path={ getRoute('doc-iri') } component={DocumentContentArea} />
            <Route path={ getRoute('recent') } component={ListContentArea} />
            <Route path={ getRoute('themes') } component={ListContentArea} />
            <Route path={ getRoute('search-country') } component={ListContentArea} />
            <Route path={ getRoute('search-year') } component={ListContentArea} />
            <Route path={ getRoute('search-doclang') } component={ListContentArea} />
            <Route path={ getRoute('search-keyword') } component={ListContentArea} />
        </Switch>
        <Route path="*" component={Footer} />
    </Aux>
   );
}


export default Page;