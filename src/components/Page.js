import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Aux} from '../utils/generalhelper';

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
            <Route path="/doc/_lang/:lang/_iri/:iri*" component={DocumentContentArea} />
            <Route path="/recent/_lang/:lang/_count/:count/_from/:from/_to/:to" component={ListContentArea} />
            <Route path="/themes/_lang/:lang/_themes/:themes/_count/:count/_from/:from/_to/:to*" component={ListContentArea} />
            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bycountry/:country/_bylang/:doclang" component={ListContentArea} />
            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_byyear/:year*" component={ListContentArea} />
            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bylang/:doclang*" component={ListContentArea} />
            <Route path="/search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bysubject/:kw*" component={ListContentArea} />
        </Switch>
        <Route path="*" component={Footer} />
    </Aux>
   );
}


export default Page;