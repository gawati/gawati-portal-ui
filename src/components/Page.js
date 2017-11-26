import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Aux} from '../utils/GeneralHelper';

import PageUpperBorder from './PageUpperBorder';
import TopBar from './TopBar';
import ContentArea from './ContentArea';
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
            <Route path="/document.html/_lang/:lang/_iri/:iri*" component={DocumentContentArea} />
            <Route path="/other.html" component={ContentArea} />
        </Switch>
        <Footer />
    </Aux>
   );
}


export default Page;