import React from 'react';
import {Link} from 'react-router-dom';
import {stringTemplate} from '../utils/stringhelper';
import {filterMap} from '../utils/generalhelper';
import BasePaginator from './BasePaginator';

/**
 * Generic Search List Paginator implementation
 * The Paginator URL routes have been factored out, They are passed in as string templates. 
 */
class SearchListPaginator extends BasePaginator {
/*     constructor(props) {
        super(props);
    }
 */

    /**
     * Generates the Link url from passed in linkUrl property in the object.
     * It is the responsibility of the caller component to pass in the right 
     * linkUrl corresponding to the pagination object.
     * 
     * @param {object} pagination object passed as a prop
     * @memberof SearchListPaginator
     */
    pageLinkEval = (pgn) => {
        let st = stringTemplate(pgn.linkUrl, pgn);
        return (
        <Link to={st} onClick={() => this.handleChangePage(pgn) }>{ pgn.text }</Link>
        );
    }

    /** 
    pageLink = (lang, year, count, from, to, text) => 
        <Link to={ 
            "/search/_lang/"+ lang + 
            "/_count/"+ count +
            "/_from/" + from  +
            "/_to/" + to + 
            "/_byyear/" + year  
            } onClick={() => this.handleChangePage({lang: lang, year: year, count: count, from: from, to: to, text: text})}>
            { text }
        </Link>;

    pageNavLink = (disableCondition, lang, year, count, from, to, text) =>
            <li className={ disableCondition ? "disabled": ""}>
                {disableCondition ? <span>{ text } </span> : this.pageLink(lang, year, count, from, to, text) }
            </li>
        ;
            */

    /**
     * Generates the link container, based on a passed in boolean condition
     * 
     * @param {boolean} disableCondition if true disables the link
     * @param {object} pgn pagination object
     * @memberof SearchListPaginator
     */
    pageNavLinkEval = (disableCondition, pgn) =>
        <li className={ disableCondition ? "disabled": ""}>
            {disableCondition ? <span>{ pgn.text } </span> : this.pageLinkEval(pgn) }
        </li>
    ;

    /**
     * Generates a new pagination object based on the passed in parameters.
     * For generating the paginator the from, to and text properties vary depending 
     * on the paginator generated for a particular page.
     * 
     * @param {object} pgn pagination object
     * @param {array} blacklist properties to replace in the pagination object
     * @param {integer} from new value of from
     * @param {integer} to new value of to
     * @param {string} text new value of text
     * @returns 
     * @memberof SearchListPaginator
     */
    linkPagination(pgn, blacklist, from, to, text) {
        let newPagination = filterMap(pgn, blacklist);
        newPagination.from = from;
        newPagination.to = to;
        newPagination.text = text;
        return newPagination;
    }

    render() {
        let pager = super.renderObjects().pager ;
        let pgn = this.props.pagination;
        // this is used to filter out props from the pagination object which are set 
        // for each specific paginator: first,previous, next, last etc. 
        let filterProps = ['from', 'to', 'text'];
        return (
            <ul className="gw-pager">
                {
                    /**
                     * First page link 
                     */
                    //lang, year, count, from, to, text)
                    this.pageNavLinkEval(
                        pager.currentPage === 1, 
                        this.linkPagination(
                            pgn, 
                            filterProps, 
                            1, 
                            pgn.count, 
                            'First'
                        )
                    )
                }
                {
                    /**
                     * Previous page link
                     */
                    this.pageNavLinkEval(
                        pager.currentPage === 1, 
                        this.linkPagination(
                            pgn, 
                            filterProps, 
                            pgn.from - pgn.count,  
                            pgn.from - 1 , 
                            'Previous'
                        )
                    )
                }
                {
                    /**
                     * Render numbered page links
                     */
                    pager.pages.map(
                        (page, index) =>
                            <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                                {
                                    this.pageLinkEval(
                                        this.linkPagination(
                                            pgn, 
                                            filterProps, 
                                            ((page - 1) * pgn.count) + 1,  
                                            (page * pgn.count) , 
                                            page
                                        ) 
                                    )
                                }
                            </li>
                    )
                }
                {
                    /**
                     * Next Page
                     */
                    this.pageNavLinkEval(
                        pager.currentPage === pager.totalPages,
                        this.linkPagination(
                            pgn, 
                            filterProps, 
                            pgn.to + 1, 
                            pgn.to + pgn.count, 
                            'Next'  
                        )
                    )
                }
                {
                    /**
                     * Last Page
                     */
                    this.pageNavLinkEval(
                        pager.currentPage === pager.totalPages,
                        this.linkPagination(
                            pgn, 
                            filterProps, 
                            ((pager.totalPages - 1) * pgn.count) + 1,  pgn.records === (pager.totalPages * pgn.count) ? pager.totalPages * pgn.count : (pager.totalPages * pgn.count) - pgn.records,  
                            'Last'
                        )
                    )
                }
            </ul>
        );
    }
}



export default SearchListPaginator;