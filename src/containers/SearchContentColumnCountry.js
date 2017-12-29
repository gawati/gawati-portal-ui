import React from 'react';
import axios from 'axios';

import {apiGetCall} from '../api';
import {isInt, coerceIntoArray} from '../utils/generalhelper';

import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';
import BaseSearchContentColumn from './BaseSearchContentColumn';
import ListingLoading from '../components/ListingLoading';
import DivListing from '../components/DivListing';
import GwSpinner from '../components/GwSpinner'

import '../css/ListingContentColumn.css';





const DocumentLoading = () => 
    <DivListing>
        <GwSpinner />
    </DivListing>;


class SearchContentColumnCountry extends BaseSearchContentColumn {
    
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            loading: true,
            listing: undefined
        };
        Object.assign(this.state, this.props.match.params);
        this.state.search = JSON.parse(decodeURIComponent(this.props.match.params.search)).search;
        console.log( " PROPS SEARCHCONTENT OCLUMN", this.state);
    }

    getSearch(paramsObj) {
        let apiRecent = apiGetCall(
            'search', 
            paramsObj
        );
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
                    search: JSON.parse(decodeURIComponent(paramsObj.search)),
                    totalPages: parseInt(items.totalpages, 10),
                    orderedBy: items.orderedby,
                    currentPage: parseInt(items.currentpage, 10),
                    listing: coerceIntoArray(items.exprAbstract)
                });
            })
            .catch(function(error) {
                console.log("error in getSearch()", error);
            });
    }

    onChangePage(newPage) {
        this.setState({loading: true});
        this.getSearch(newPage);

    }

    generatePagination = () => {
        
        var pagination = {
            search: this.state.search,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to,
            lang: this.state.lang,
            totalPages: this.state.totalPages,
            records: this.state.records
        };
        Object.keys(pagination).map(k => pagination[k] = !isInt(pagination[k]) ? pagination[k] : parseInt(pagination[k], 10));
        // we set the linkUrl prop on the pagination object, so the paginator knows how to render the URLs
        let linkUrl = "/search/_lang/{lang}/_count/{count}/_from/{from}/_to/{to}/_bycountry/{country}";
        pagination.linkUrl = linkUrl; 
        
        return pagination;  
    }


   
    componentDidMount() {
        this.getSearch({
            search: encodeURIComponent(JSON.stringify(this.state.search)),
            count: this.state.count,
            from: this.state.from,
            to: this.state.to
        });
    }

    componentDidUpdate() {
       // this.getListing({})
    }

    componentWillReceiveProps(nextProps) {
        this.getSearch({
            search: encodeURIComponent(nextProps.match.params.search),
            count: parseInt(nextProps.match.params.count, 10),
            from: parseInt(nextProps.match.params.from, 10),
            to: parseInt(nextProps.match.params.to, 10),
            doclang: nextProps.match.params.doclang
        });
    }    

    render() {
        if (this.state.loading === true || this.state.listing === undefined ) {
            return (
                <ListingLoading>
                    <h1 className="listingHeading">Document Results</h1>
                     <GwSpinner />
                </ListingLoading>
            );
        } else {        
            let pagination = this.generatePagination() ;
            let content = 
            <DivListing>
                <h1 className="listingHeading">Document Results <small>for the county {this.state.country} </small></h1>
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={this.onChangePage.bind(this)} />
                </DivFeed>
                {
                this.state.listing.map(abstract => {
                    return (
                    <ExprAbstract key={abstract['expr-iri']} match={this.props.match} abstract={abstract} />   
                    )
                })
                }
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={this.onChangePage.bind(this)} />
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

export default SearchContentColumnCountry;