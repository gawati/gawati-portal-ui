import React from 'react';
import axios from 'axios';
import {apiGetCall} from '../api';
import {isInt, coerceIntoArray} from '../utils/generalhelper';
import {xQueryFilterBuilder} from '../utils/xqueryhelper';
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


class SearchContentColumnFilter extends BaseSearchContentColumn {
    
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.match.params['lang'],
            from: this.props.match.params['from'],
            to: this.props.match.params['to'],
            count: this.props.match.params['count'],
            totalPages: 0,
            loading: true,
            listing: undefined
        };
        //console.log(" PROPS PARAMS SearchContentColumnFilter ", this.props.match.params);
        //Object.assign(this.state, this.props.match.params);
        console.log(" XQUERY FILTER ", xQueryFilterBuilder(this.convertEncodedStringToObject(this.props.match.params.q)).join(''));

        this.state.q = xQueryFilterBuilder(this.convertEncodedStringToObject(this.props.match.params.q)).join('');
        //console.log(" THIS.STATE ", this.state, this.convertEncodedStringToObject(this.props.match.params.q));
    }

    getSearch(paramsObj) {
        console.log( " GET SEARCH ", paramsObj);
        let apiRecent = apiGetCall(
            'filter', 
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
                    q: JSON.stringify(paramsObj.q),
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
            q: JSON.stringify(this.state.q),
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

    convertObjectToEncodedString = (obj) => encodeURIComponent(JSON.stringify(obj)) ;
    
    convertEncodedStringToObject = (aString) => JSON.parse(decodeURIComponent(aString)) ;
   
    componentDidMount() {
        this.getSearch({
            q: this.state.q,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to
        });
        
    }

    componentWillReceiveProps(nextProps) {
        /** 
        this.getSearch({
            xQueryFilterBuilder(this.convertEncodedStringToObject(nextProps.match.params.q)).join('')
            q: (nextProps.match.params.q),
            count: parseInt(nextProps.match.params.count),
            from: parseInt(nextProps.match.params.from),
            to: parseInt(nextProps.match.params.to),
            doclang: nextProps.match.params.doclang
        });
        **/
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
                    <h1 className="listingHeading">Document Results</h1>
                    <DivFeed>
                        <SearchListPaginator pagination={pagination} onChangePage={(this.onChangePage.bind(this))} />
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

export default SearchContentColumnFilter;

