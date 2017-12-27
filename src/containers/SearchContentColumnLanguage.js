import React from 'react';
import axios from 'axios';
import {coerceIntoArray, isInt, getLangCodeAlpha3b, getLangDesc} from '../utils/generalhelper';
import {apiGetCall} from '../api';
import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';
import BaseSearchContentColumn from './BaseSearchContentColumn';
import ListingLoading from '../components/ListingLoading';
import GwSpinner from '../components/GwSpinner';

import '../css/ListingContentColumn.css';


class SearchContentColumnLanguage extends BaseSearchContentColumn {
    
    constructor(props) {
        super(props);
    }

    getSearch(paramsObj) {
        let apiRecent = apiGetCall(
            'search-by-language', 
            paramsObj
        );
        axios.get(apiRecent)
            .then(response => {
                const items = response.data.exprAbstracts;
                this.setState({
                    loading: false,
                    doclang: paramsObj.doclang,
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

    generatePagination = () => {
        console.log (" PAGIN STATE ", this.state);
        var pagination = {
            lang: this.state.lang,
            doclang: this.state.doclang,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to,
            totalPages: this.state.totalPages,
            records: this.state.records
        };
        Object.keys(pagination).map(k => pagination[k] = isInt(pagination[k]) === false ? pagination[k] : parseInt(pagination[k]));
        // we set the linkUrl prop on the pagination object, so the paginator knows how to render the URLs
        console.log (" PAGINATION GEN ", pagination);
        let linkUrl = "/search/_lang/{lang}/_count/{count}/_from/{from}/_to/{to}/_bylang/{doclang}";
        pagination.linkUrl = linkUrl; 
        
        return pagination;  
    }

    componentDidMount() {
        this.getSearch({doclang: this.state.doclang, count: this.state.count, from: this.state.from, to: this.state.to});
    }

    componentWillReceiveProps(nextProps) {
        console.log( " NEXT PROPS ", nextProps);
        this.getSearch({
            doclang: nextProps.match.params.doclang,
            count: parseInt(nextProps.match.params.count),
            from: parseInt(nextProps.match.params.from),
            to: parseInt(nextProps.match.params.to)
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
            console.log(" LANG ", this.state.doclang, getLangDesc(this.state.doclang));
            let content = 
            <div className={ `left col-9`}>
                <div className="search-result">
                    <h1 className="listingHeading">Document Results <small>for the Language {getLangDesc(this.state.doclang).content} </small></h1>;
                    <DivFeed>
                        <SearchListPaginator pagination={pagination} onChangePage={this.onChangePage.bind(this)} />
                    </DivFeed>
                    {
                    this.state.listing.map(abstract => {
                        return (
                        <ExprAbstract key={abstract['expr-iri']} abstract={abstract} />   
                        )
                    })
                    }
                    <DivFeed>
                        <SearchListPaginator pagination={pagination} onChangePage={this.onChangePage.bind(this)} />
                    </DivFeed>
                </div>
            </div>
            ;
    return content;
    }
    }
}


export default SearchContentColumnLanguage;

