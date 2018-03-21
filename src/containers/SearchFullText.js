import React from 'react';
import axios from 'axios';

import {apiGetCall} from '../api.js';
import { T } from '../utils/i18nhelper';
import {substringBeforeLastMatch } from '../utils/stringhelper';
import {documentServer} from '../constants';
import {anBody} from '../utils/akomantoso';
import GwSpinner from '../components/GwSpinner'
import DocumentPDF from './DocumentPDF';

import '../css/SearchFullText.css';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';

/**
 * Component to search for a word/phrase in the full text of a PDF document.
 * 
 * @class SearchFullText
 * @extends {React.Component}
 */
class SearchFullText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            results: [],
            loading: false,
            showResults: false
        };
    }

    getPDFFilePath() {
        let body = anBody(this.props.doc, this.props.type);
        let mainDocument ;
        if (Array.isArray(body.book)) {
            mainDocument = body.book.filter(book => book.refersTo === '#mainDocument');
        } else {
            mainDocument = body.book;
        }
        let cRef = mainDocument.componentRef;
        let pdfLink = documentServer() + substringBeforeLastMatch(cRef.src, "/") + "/" + cRef.alt ;
        return pdfLink;
    }

    componentDidMount() {
        let pdfLink = this.getPDFFilePath();
        this.setState({ pdfLink });
    }

    getSearchResultsAsync = () => {
        const searchTerm = this.state.term.trim().toLowerCase();
        let apiRecent = apiGetCall(
            'search-fulltext', 
            {iri: this.props.iri, term: searchTerm}
        );
        axios.get(apiRecent)
            .then(response => { 
                this.setState({
                    results: response.data["pages"] ? response.data["pages"].split(" "): [],
                    loading: false,
                    showResults: true
                });
            })
            .catch(function(error) {
                console.log("error in searching full text", error);
            });
    };

    onChange = (e) => {
        this.setState({
          term: e.target.value,
          showResults: false
        });
    };

    handleSearchSumbit = () => {
        this.setState({
            loading: true,
            showResults: false
        });
        this.getSearchResultsAsync();
    }

    renderPageLinks() {
        let pageLinks = this.state.results.sort().map(p => {
            let link = this.state.pdfLink + "#page=" + p;
            return <li key={p}><a href={link} target="_blank">{p}</a></li>;            
        });
        return (
            <div>
                The search term <b>{this.state.term}</b> was found in the following pages:
                <ul className="inline-list">{pageLinks}</ul>
                <hr />
                <DocumentPDF doc={this.props.doc} type={this.props.type} searchTerm={this.state.term} />
            </div>
        );
    }

    renderSearchResult() {
        if (this.state.showResults) {             
            return (
                <div>
                { (this.state.results && this.state.results.length > 0) ? this.renderPageLinks() : "Not Found"}
                </div>                                
            );
        } else {
            return "";
        }
    }

    render() {
        const inputProps = {
            placeholder: T("type the search term"),
            value: this.state.term,
            onChange: this.onChange
        };
        return(
            <div>
                <form className="search-container" onSubmit={e => e.preventDefault()}>
                    <input {...inputProps} />
                    <button className={ `submit-button w-button` } data-wait="Please wait..." type="submit" 
                    onClick={this.handleSearchSumbit.bind(this)}>
                        <FontAwesome name='search' />
                    </button>
                </form>
                {this.state.loading ? <GwSpinner /> : this.renderSearchResult()}
            </div>
        );
    }
}

export default SearchFullText;