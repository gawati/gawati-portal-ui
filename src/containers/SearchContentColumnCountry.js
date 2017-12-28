import React from 'react';
import axios from 'axios';
import {apiGetCall} from '../api';
import {isInt, coerceIntoArray} from '../utils/generalhelper';
import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';
import BaseSearchContentColumn from './BaseSearchContentColumn';
import ListingLoading from '../components/ListingLoading';
import GwSpinner from '../components/GwSpinner'
import '../css/ListingContentColumn.css';





const DocumentLoading = () => 
    <div className={ `left col-9`}>
        <div className="search-result">
        Searching...
        </div>
    </div>;


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
                    from: parseInt(items.itemsfrom),
                    count: parseInt(items.pagesize),
                    to: parseInt(items.itemsfrom) + parseInt(items.pagesize) - 1,
                    records: parseInt(items.records),
                    search: JSON.parse(decodeURIComponent(paramsObj.search)),
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
            search: this.state.search,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to,
            lang: this.state.lang,
            totalPages: this.state.totalPages,
            records: this.state.records
        };
        Object.keys(pagination).map(k => pagination[k] = !isInt(pagination[k]) ? pagination[k] : parseInt(pagination[k]));
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
            count: parseInt(nextProps.match.params.count),
            from: parseInt(nextProps.match.params.from),
            to: parseInt(nextProps.match.params.to),
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
            <div className={ `left col-9`}>
                <div className="search-result">
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
                </div>
            </div>
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

