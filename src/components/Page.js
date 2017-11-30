import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Aux} from '../utils/generalhelper';

import PageUpperBorder from './PageUpperBorder';
import TopBar from './TopBar';
import HomeContentArea from './HomeContentArea';
import DocumentContentArea from './DocumentContentArea';
import ListContentArea from './ListContentArea';
import Footer from './Footer';

function Page(){
   return (
    <Aux>
        <TopBar />
        <Switch>
            <Route exact path="/" component={HomeContentArea} />
            <Route exact path="/index.html" component={HomeContentArea} />
            <Route path="/doc/_lang/:lang/_iri/:iri*" component={DocumentContentArea} />
            <Route path="/recent/_lang/:lang/_count/:count/_from/:from/_to/:to" component={ListContentArea} />
            <Route path="/themes/_lang/:lang/_themes/:themes/_count/:count/_from/:from/_to/:to" component={ListContentArea} />
            
        </Switch>
        <Footer />
    </Aux>
   );
}


export default Page;