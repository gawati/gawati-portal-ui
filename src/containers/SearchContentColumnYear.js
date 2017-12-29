import React from 'react';
import axios from 'axios';

import {apiGetCall} from '../api';
import {coerceIntoArray} from '../utils/generalhelper';

import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';
import ListingLoading from '../components/ListingLoading';
import DivListing from '../components/DivListing';
import GwSpinner from '../components/GwSpinner'

import '../css/ListingContentColumn.css';

class SearchContentColumnYear extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            loading: true,
            listing: undefined
        };
        Object.assign(this.state, this.props.match.params);
        console.log( " PROPS SEARCHCONTENT OCLUMN", props);
    }

    getSearch(paramsObj) {
        let apiRecent = apiGetCall(
            'search-by-year', 
            paramsObj
        );
        axios.get(apiRecent)
            .then(response => {
                const items = response.data.exprAbstracts;
                console.log(" ITEMS ", items);
                this.setState({
                    loading: false,
                    year: paramsObj.year,
                    from: parseInt(items.itemsfrom),
                    count: parseInt(items.pagesize),
                    to: parseInt(items.itemsfrom) + parseInt(items.pagesize) - 1,
                    records: parseInt(items.records),
                    totalPages: parseInt(items.totalpages),
                    orderedBy: items.orderedby,
                    currentPage: parseInt(items.currentpage),
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
            year: this.state.year,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to,
            lang: this.state.lang,
            totalPages: this.state.totalPages,
            records: this.state.records
        };
        Object.keys(pagination).map(k => pagination[k] = k === 'lang' ? pagination[k] : parseInt(pagination[k]));
        // we set the linkUrl prop on the pagination object, so the paginator knows how to render the URLs
        let linkUrl = "/search/_lang/{lang}/_count/{count}/_from/{from}/_to/{to}/_byyear/{year}";
        pagination.linkUrl = linkUrl; 
        
        return pagination;  
    }


   
    componentDidMount() {
        this.getSearch({year: this.state.year, count: this.state.count, from: this.state.from, to: this.state.to});
    }

    componentWillReceiveProps(nextProps) {
        this.getSearch({
            year: parseInt(nextProps.match.params.year),
            count: parseInt(nextProps.match.params.count),
            from: parseInt(nextProps.match.params.from),
            to: parseInt(nextProps.match.params.to)
        });
    }    

    render() {
        if (this.state.listing === undefined ) {
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
                <h1 className="listingHeading">Document Results <small>for the year {this.state.year} </small></h1>
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

export default SearchContentColumnYear;

