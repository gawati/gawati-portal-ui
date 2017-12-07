import React from 'react';
import { NavLink } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import {stringCut, displayDate} from '../utils/generalhelper';
import {apiGetCall} from '../api.js';

import mainLogo from '../images/logo.png';
import mobileButton from '../images/th-menu.png';

import '../css/Autosuggest.css';
import '../css/SiteSearchAutoComplete.css';


const Logo = () =>
    <NavLink className="nav-brand" to="/">
    <img alt="AIF" src={mainLogo} width="75"/>
    </NavLink>
    ;

const SiteHeading = () =>
    <div className="logotype">
        <h1>African Law Library</h1>
        <h2>innovative access to law</h2>
    </div>
    ;


    



class SiteSearchAutoComplete extends React.Component {
    constructor(props) {
        super(props);
        //console.log(" PROPS SITESEARCH ", this.props);
        this.state = {
            loading: false,
            value: '',
            suggestions: []
        };
        this.lastRequestId = null;
    }

    getSuggestionsAsync = (value) => {
        if (this.lastRequestId !== null ) {
            clearTimeout(this.lastRequestId);
        }
        this.setState({
            loading: true
        });
        this.lastRequestId = setTimeout(
            () => this.getSearchResultsAsync(value)
            ,
            1000
        );
    };


    abbrTitle = (thisString) => {
        if (thisString.length > 200) {
            return thisString.substr(0,199) + "..."
        } else {
            return thisString;
        }
    };
    

    getSearchResultsAsync = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        //console.log( "Calling search grouped ");
        let apiRecent = apiGetCall(
            'search-grouped', 
            {query: inputValue}
        );
        axios.get(apiRecent)
            .then(response => {
                //console.log (" Response. data ", response.data.searchGroups);
                const items = response.data.searchGroups.searchGroup;
                //console.log(" ITEMS ", items);
                const filtered = items.filter(item => item.hasOwnProperty('searchResult'));
                this.setState({
                    loading: false,
                    suggestions: filtered
                });
            })
            .catch(function(error) {
                console.log("error in getDocument()", error);
            });        
    };    

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        //console.log(" onSuggestionsFetchRequested ", value);
        this.getSuggestionsAsync(value);
    };

    shouldRenderSuggestions = (value) => {
        //console.log(" should fetch ", value);
        return value.trim().length > 2;
    }
      

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: []
        });
    };

    renderSectionTitle = (section) => {
        //console.log(" renderSectionTItle ", section);
        return (
          <strong>{ section.label }</strong>
        );
    };

    getSectionSuggestions = (section) => {
        //console.log(" getSectionSuggestions ", section);
        return section.searchResult || [];
    };

    renderSuggestion = (suggestion) => {
        let itemDate = displayDate(suggestion.exprAbstract.date[1].value) || suggestion.exprAbstract.date[1].value ;
        return (
        <div className="ui-ac-item-render">
            <div className="ui-ac-item-render-content">
                <h3>{   stringCut(199, suggestion.exprAbstract.publishedAs || "unknown")  }</h3>
                <nav className="ui-act-item-meta">
                <ol>
                    <li><span className="ui-ac-item-type">{suggestion.exprAbstract.type.name}</span></li>
                    <li><span className="ui-ac-item-country">{suggestion.exprAbstract.country.showAs}</span></li>
                    <li><span className="ui-ac-item-date">{itemDate}</span></li>
                </ol>
                </nav>
            </div>
        </div>
        );
    };
      
      /**
            <div className="ui-ac-item-render">
            <div className="ui-ac-item-render-content">
                <h3>{   stringCut(199, suggestion.exprAbstract.publishedAs || "unknown")  }</h3>
                <nav class="ui-act-item-meta">
                <ol>
                    <li><span class="ui-ac-item-type">{suggestion.exprAbstract.type.name}</span></li>
                    <li><span class="ui-ac-item-country">{suggestion.exprAbstract.country.showAs}</span></li>
                    <li><span class="ui-ac-item-date">{suggestion.exprAbstract.date[1].value }</span></li>
                </ol>
                </nav>
            </div>
        </div>

       */

    /**
    * We render a custom input component to pass in the data-loading prop which is
    * used to set the css spinner
    */
    renderInputComponent = inputProps => {
        //console.log( " RENDER INPUT ", inputProps);
        return (
            <input data-loading={ inputProps.loading } {...inputProps} />
        );
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        console.log(
            "event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method ", 
            event, suggestion, suggestionValue, suggestionIndex, sectionIndex, method
        );
    }

    getSuggestionValue = (suggestion) => suggestion.sid || suggestion.name ;  

    render() {
      
        const { value, suggestions, loading } = this.state;
        const inputProps = {
          placeholder: "Type anything",
          value,
          loading: loading ? "yes" : "no",
          onChange: this.onChange
        };
        const status = (loading ? 'Loading...' : 'Type to load suggestions');
        console.log( " STATE ", this.state);
        // Autosuggest will pass through all these props to the input.
        return (
            <div>
              <Autosuggest 
                suggestions={suggestions}
                multiSection={true}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                renderSectionTitle={this.renderSectionTitle}
                getSectionSuggestions={this.getSectionSuggestions}
                renderInputComponent={this.renderInputComponent}
                inputProps={inputProps} />
                <input className={ `submit-button w-button` } data-wait="Please wait..." type="submit"
                    value="GO"/>
            </div>
          );
      }
}

const SearchBox = () =>
    <div className={ `search-form-container col-6` }>
        <form className="search-form" data-name="Email Form" id="email-form" name="email-form">
            <div className="div-block w-clearfix">
               <SiteSearchAutoComplete /> 
                {/*
                <input className="text-field-2" data-name="Name" id="search" maxLength="256"
                    name="name" placeholder="Search " type="text"/>
               
                <input className={ `submit-button w-button` } data-wait="Please wait..." type="submit"
                    value="GO"/>
                */
                }
            </div>
        </form>
    </div>
    ;

function TopBar() {
    return (
        <header className="navigation-bar">

            <div className="container">
                <Logo />
                <SiteHeading />
                <div className="mobile-button">
                    <img alt="menu" src={mobileButton} />
                </div>
                <SearchBox />
            </div>
            <div className="w-nav-overlay" data-wf-ignore=""/>
        </header>
   
    );
}

export default TopBar;