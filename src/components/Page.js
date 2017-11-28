import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Aux} from '../utils/GeneralHelper';

import PageUpperBorder from './PageUpperBorder';
import TopBar from './TopBar';
import HomeContentArea from './HomeContentArea';
import DocumentContentArea from './DocumentContentArea';
import Footer from './Footer';

function Page(){
   return (
    <Aux>
        <PageUpperBorder />
        <TopBar />
        <Switch>
            <Route exact path="/" component={HomeContentArea} />
            <Route exact path="/index.html" component={HomeContentArea} />
            <Route path="/doc/_lang/:lang/_iri/:iri*" component={DocumentContentArea} />
        </Switch>
        <Footer />
    </Aux>
   );
}


export default Page;