import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {apiGetCall} from '../api';
import {isInt, coerceIntoArray} from '../utils/generalhelper';

import {T} from '../utils/i18nhelper';

import DivFeed from '../components/DivFeed';
import DivTimelineListing from '../components/DivTimelineListing';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';
import BaseSearchContentColumn from './BaseSearchContentColumn';
import TimelineListingLoading from '../components/TimelineListingLoading';
import '../css/ListingContentColumn.css';

class SearchCategoryContentColumn extends BaseSearchContentColumn {
    
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.match.params['lang'],
            term: this.props.match.params['term'],
            category: this.props.match.params['category'],
            from: this.props.match.params['from'],            
            count: this.props.match.params['count'],
            totalPages: 0,
            loading: true,
            listing: undefined
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    getSearch(paramsObj) {
        console.log( " GET SEARCH CATEGORY", paramsObj);
        let apiRecent = apiGetCall(
            'search-category', 
            paramsObj
        );
        // cancel the previous request
        if (typeof this.source !== typeof undefined) {
            this.source.cancel('Operation canceled due to new request.')
        }

        // save the new request for cancellation
        this.source = axios.CancelToken.source();

        axios.request({
            method: "GET",
            url: apiRecent,
            debounce: 600,
            cancelToken:this.source.token
        })
            .then(response => {
                const items = response.data.searchGroup;
                if (this._mounted) {
                    if (parseInt(items.records, 10) === 0) {
                        this.setState({
                            loading: false,
                            from:1,
                            count:0,
                            records: parseInt(items.records, 10)
                        })
                    } else {
                        this.setState({
                            loading: false,
                            from: parseInt(items.itemsfrom, 10),
                            count: parseInt(items.pagesize, 10),
                            records: parseInt(items.records, 10),
                            totalPages: parseInt(items.totalpages, 10),
                            currentPage: parseInt(items.currentpage, 10),
                            listing: coerceIntoArray(items.searchResult)
                        });
                    }
                }

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
        const { count, from, lang, totalPages, records } = this.state ;
        const { term, category } = this.props.match.params ; 
        const to = (from + count) - 1;
        var pagination = {
            term: term,
            category: category,
            count: count,
            from: from,
            to: to,
            lang: lang,
            totalPages: totalPages,
            records: records
        };
        Object.keys(pagination).map(k => pagination[k] = !isInt(pagination[k]) ? pagination[k] : parseInt(pagination[k], 10));
        // we set the linkUrl prop on the pagination object, so the paginator knows how to render the URLs
        /** 
         *  !+LINK_ROUTE(KOHSAH, 2017-12-31)
         *  use config based route instead
         */
        /** 
        let linkUrl = "/search/_lang/{lang}/_count/{count}/_from/{from}/_to/{to}/_bycountry/{country}";
        pagination.linkUrl = linkUrl; 
        **/

        let linkRoute = "search-category";
        pagination.linkRoute = linkRoute;

        return pagination;  
    }

    componentDidMount() {
        this._mounted = true;
        this.getSearch({
            term: this.state.term,
            category: this.state.category,
            count: this.state.count,
            from: this.state.from
        });
    }

    componentWillReceiveProps(nextProps) {
        // we need to always convert the url query to a back-end XQuery
        this.getSearch({
            term: nextProps.match.params.term,
            category: nextProps.match.params.category,
            count: parseInt(nextProps.match.params.count, 10),
            from: parseInt(nextProps.match.params.from, 10)
        });
    }

    renderHeading = () => {
        return (
            <DivFeed>
                <h5>Search results for term <em>'{this.state.term}'</em> in category <em>'{this.state.category}'</em>.</h5>
            </DivFeed>
        );
    }

    renderDocumentLoading = () =>
        <TimelineListingLoading>
            <h1 className="listingHeading">{T("Document Results")}</h1>
        </TimelineListingLoading> ;

    renderNoDocumentsFound = () =>
        <DivTimelineListing>
            <h1 className="listingHeading">{T("Document Results")}</h1>
            <div>No Documents Found</div>
        </DivTimelineListing> ;

    renderListing = () => {
       	let pagination = this.generatePagination() ;
        let content = 
            <DivTimelineListing lang={this.props.match.params.lang}>
                {this.renderHeading()}
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={(this.onChangePage)} />
                </DivFeed>
                {
                this.state.listing.map(item => {
                    return (
                    <ExprAbstract key={item.exprAbstract['expr-iri']} match={this.props.match} abstract={item.exprAbstract} />   
                    )
                })
                }
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={this.onChangePage} />
                </DivFeed>
            </DivTimelineListing>
        ;
        return content;

    };

    render() {
        const { loading, listing, records } = this.state;
        let result;

        if (loading === true || listing === undefined ) {
            result = this.renderDocumentLoading();
        } else if (parseInt(records, 10) === 0 || listing === undefined) {
            result = this.renderNoDocumentsFound();
        } else {
            result = this.renderListing();
        }

        let content = 
        <div className={ `main-col col-xs-12 col-lg-9 col-md-9 col-sm-12` }>
            <Tabs>
                <TabList>
                    <Tab>{ T("Document Results") }</Tab>
                </TabList>
                <TabPanel>
                    <div className="tab-pane tab-active" data-tab="1">
                        {result}
                    </div>
                </TabPanel>
            </Tabs>
        </div> 
        return content;  
    }
}


export default SearchCategoryContentColumn;

