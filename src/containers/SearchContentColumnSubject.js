import React from 'react';
import axios from 'axios';
import {apiGetCall} from '../api';
import {coerceIntoArray} from '../utils/generalhelper';
import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';

import '../css/ListingContentColumn.css';
import GwSpinner from '../components/GwSpinner';



const UnderDevelopment = () => 
    <div className={ `left col-9`}>
        <div className="search-result">
        Under Development
        </div>
    </div>;


const DocumentLoading = () => 
    <div className={ `left col-9`}>
        <div className="search-result">
         <GwSpinner />
        </div>
    </div>;


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
            lang: this.state.lang,
            totalPages: this.state.totalPages,
            records: this.state.records
        };
        Object.keys(pagination).map(k => pagination[k] = k.endsWith('lang') || k === 'kw' ? pagination[k] : parseInt(pagination[k]));
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
            count: parseInt(nextProps.match.params.count),
            from: parseInt(nextProps.match.params.from),
            to: parseInt(nextProps.match.params.to)
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
            <div className={ `left col-9`}>
                <div className="search-result">
                    <h1 className="listingHeading">Document Results <small>for the Subject {this.state.kw} </small></h1>
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

export default SearchContentColumnSubject;

