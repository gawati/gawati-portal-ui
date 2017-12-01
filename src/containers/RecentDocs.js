import React from 'react';

import {homePageFilterWords} from '../constants';
import {Aux} from '../utils/generalhelper';

import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';

const RecentDocs = ({recentDocs, tab}) => 
    <div className={ `tab-pane tab-active` } data-tab="t`${tab}`">
        <RecentIntro />
        <RecentSummary recentDocs={recentDocs} />
        <div className="button-wrapper">
        <a className={ `button w-button` } href={ `/recent/_lang/eng/_count/10/_from/1/_to/10`}>More posts&#160;→</a>
        </div>
    </div>
    ;

const RecentIntro = () => 
    <DivFeed>
        <h2>Latest Documents</h2>
        <a>
            <p>The most recently published documents</p>
        </a>
        <div className="grey-rule"/>
    </DivFeed>
    ;      

const RecentSummary = ({recentDocs}) => 
        <Aux>
        {
            recentDocs.map(abstract => {
                return (
                <ExprAbstract key={abstract['expr-iri']} abstract={abstract} />   
                )
            })
        }
        </Aux>
        ;

export default RecentDocs;