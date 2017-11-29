import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Aux} from '../utils/GeneralHelper';

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
            <Route path="/recent/_lang/:lang/count/:count/from/:from/to/:to" component={ListContentArea} />
        </Switch>
        <Footer />
    </Aux>
   );
}


export default Page;