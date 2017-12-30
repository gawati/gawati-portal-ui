import React from 'react';
import axios from 'axios';

import {apiGetCall} from '../api';
import {coerceIntoArray} from '../utils/generalhelper';

import DivFeed from '../components/DivFeed';
import DivListing from '../components/DivListing';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';

import '../css/ListingContentColumn.css';
import GwSpinner from '../components/GwSpinner';

const DocumentLoading = () => 
    <DivListing>
         <GwSpinner />
    </DivListing>
    ;


class SearchContentColumnSubject extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        /*    lang: this.props.match.params['lang'],
            count: this.props.match.params['count'],
            from: this.props.match.params['from'],
            to: this.props.match.params['to'],
            year: this.props.match.params['year'],*/
            totalPages: 0,
            loading: true,
            listing: undefined
        };
        Object.assign(this.state, this.props.match.params);
        console.log( " PROPS SEARCHCONTENT OCLUMN", props);
        this.onChangePage = this.onChangePage.bind(this);
    }

    getSearch(paramsObj) {
        
        let apiRecent = apiGetCall(
            'search-by-subject', 
            paramsObj
        );
        axios.get(apiRecent)
            .then(response => {
                const items = response.data.exprAbstracts;
                console.log(" ITEMS ", paramsObj);
                this.setState({
                    loading: false,
                    kw: paramsObj.kw,
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
                console.log("error in getSearch()", error);
            });
    }

    onChangePage(newPage) {
        console.log (" NEW PAGE ", newPage);
        this.setState({loading: true});
        this.getSearch(newPage);

    }

    generatePagination = () => {
        console.log (" PAGIN STATE ", this.state);
        var pagination = {
            lang: this.state.lang,
            kw: this.state.kw,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to,
            totalPages: this.state.totalPages,
            records: this.state.records
        };
        Object.keys(pagination).map(k => pagination[k] = k.endsWith('lang') || k === 'kw' ? pagination[k] : parseInt(pagination[k], 10));
        // we set the linkUrl prop on the pagination object, so the paginator knows how to render the URLs
        console.log (" PAGINATION GEN ", pagination);
        let linkUrl = "/search/_lang/{lang}/_count/{count}/_from/{from}/_to/{to}/_bysubject/{kw}";
        pagination.linkUrl = linkUrl; 
        
        return pagination;  
    }


   
    componentDidMount() {
        this.getSearch({kw: this.state.kw, count: this.state.count, from: this.state.from, to: this.state.to});
    }

    componentDidUpdate() {
       // this.getListing({})
    }

    componentWillReceiveProps(nextProps) {
        this.getSearch({
            kw: nextProps.match.params.kw,
            count: parseInt(nextProps.match.params.count, 10),
            from: parseInt(nextProps.match.params.from, 10),
            to: parseInt(nextProps.match.params.to, 10)
        });
    }    

    render() {
        if (this.state.listing === undefined ) {
            return (
                <DocumentLoading />
            );
        } else {        
            let pagination = this.generatePagination() ;
            let content = 
            <DivListing>
                <h1 className="listingHeading">Document Results <small>for the Subject {this.state.kw} </small></h1>
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={this.onChangePage} />
                </DivFeed>
                {
                this.state.listing.map(abstract => {
                    return (
                    <ExprAbstract key={abstract['expr-iri']} match={this.props.match} abstract={abstract} />   
                    )
                })
                }
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={this.onChangePage} />
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

export default SearchContentColumnSubject;

