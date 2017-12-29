import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {NavLink} from 'react-router-dom';

import DivFeed from '../components/DivFeed';

import {apiGetCall} from '../api';
import {Aux, prefixIri, getDocumentType, getDocTypes, isEmpty, getDocType, isInt, coerceIntoArray} from '../utils/generalhelper';
import {anPublication} from '../utils/akomantoso';
import ExprAbstract from './ExprAbstract';
import ThemeListPaginator from '../components/ThemeListPaginator';
import ListingLoading from '../components/ListingLoading';
import DivListing from '../components/DivListing';

import '../css/react-tabs.css';
import 'react-tabs/style/react-tabs.css';
import '../css/ListingContentColumn.css';

import linkIcon from '../images/export.png';



class ListThemeContentColumn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.match.params['lang'],
            count: this.props.match.params['count'],
            from: this.props.match.params['from'],
            to: this.props.match.params['to'],
            themes : this.props.match.params['themes'],
            records: 0,
            totalPages: 0,
            orderedBy: '',
            loading: true,
            listing: undefined
        };
      
    }
   
    getListing(paramsObj) {
        let apiRecent = apiGetCall(
            'themes-summary', 
            paramsObj
        );
        console.log(" API RECENT ", apiRecent);
        axios.get(apiRecent)
            .then(response => {
                const items = response.data.exprAbstracts;
                console.log(" ITEMS ", items);
                this.setState({
                    loading: false,
                    from: parseInt(items.itemsfrom, 10),
                    count: parseInt(items.pagesize, 10),
                    to: parseInt(items.itemsfrom, 10) + parseInt(items.pagesize, 10) - 1,
                    records: parseInt(items.records, 10),
                    totalPages: parseInt(items.totalpages, 10),
                    orderedBy: items.orderedby,
                    currentPage: parseInt(items.currentpage, 10),
                    listing: coerceIntoArray(items.exprAbstract)
                });
            })
            .catch(function(error) {
                console.log("error in getDocument()", error);
            });
    }


   
    componentDidMount() {
        this.getListing({themes: this.state.themes.split("|") , count: this.state.count, from: this.state.from, to: this.state.to});
    }

    componentDidUpdate() {
       // this.getListing({})
    }

    onChangePage(newPage) {
        console.log (" NEW PAGE ", newPage);
        this.setState({loading: true});
        this.getListing(newPage);
        //this.setState({loading: true}, 
        //    () => {
        //        this.getListing({count: newPage.count, from: newPage.from, to: newPage.to});
        //    }
        //);
    }

    generatePagination = () => {
        var pagination = {
            themes: this.state.themes,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to,
            lang: this.state.lang,
            totalPages: this.state.totalPages,
            records: this.state.records
        };
        Object.keys(pagination).map(k => pagination[k] = isInt(pagination[k]) === false ? pagination[k] : parseInt(pagination[k]));
        return pagination;  
    }


    render() {
        if (this.state.loading === true || this.state.listing === undefined ) {
            return (
                <ListingLoading>
                     <h1 className="listingHeading">Theme</h1>
                </ListingLoading>
            );
        } else {        
            let pagination = this.generatePagination() ;
            let content = 
            <DivListing>
                <h1 className="listingHeading">Theme</h1>
                <DivFeed>
                    <ThemeListPaginator pagination={pagination} onChangePage={this.onChangePage.bind(this)} />
                </DivFeed>
                    {
                    console.log( " state listing ", this.state)
                    }
                    {
                    !Array.isArray(this.state.listing) ?
                    <ExprAbstract key={this.state.listing['expr-iri']} abstract={this.state.listing} /> :    
                    this.state.listing.map(abstract => {
                        return (
                        <ExprAbstract key={abstract['expr-iri']} abstract={abstract} />   
                        )
                    })
                    }
                <DivFeed>
                    <ThemeListPaginator pagination={pagination} onChangePage={this.onChangePage.bind(this)} />
                </DivFeed>
            </DivListing>
            ;
            return content;
    }
    }
}

/*
const Loading = ({tab}) => 
    <div className={ `tab-pane tab-active` } data-tab="t`${tab}`">
        Loading...
    </div>;
*/

export default ListThemeContentColumn;

