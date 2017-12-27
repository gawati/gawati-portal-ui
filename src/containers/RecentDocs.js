import React from 'react';
import { NavLink } from 'react-router-dom';

import {Aux} from '../utils/generalhelper';

import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import GwSpinner from '../components/GwSpinner'

import '../css/RecentDocs.css';

const RecentDocs = ({loading, recentDocs, tab}) => 
    <div className={ `tab-pane tab-active` } data-tab={`t${tab}`}>
        <RecentIntro loading={loading} />
        {getRecentDocs(loading, recentDocs, tab)}
    </div>
    ;

const getRecentDocs = (loading, recentDocs, tab) => {
        if (loading === true) {
            return (
                <noscript />
            );
        }
        return (
            <Aux>
                <RecentSummary recentDocs={recentDocs}  />
                <div className="button-wrapper">
                <NavLink className={ `button w-button` } to={ `/recent/_lang/eng/_count/10/_from/1/_to/10`}>More posts&#160;→</NavLink>
                </div>
            </Aux>
        );    
} 

const RecentIntro = ({loading}) => 
    <DivFeed customClass="white-feed">
        <h2>Latest Documents</h2>
        <a>
            <p>The most recently published documents</p>
        </a>
        <div className="grey-rule"/>
        {loading === true ? <GwSpinner />: <noscript /> }
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
