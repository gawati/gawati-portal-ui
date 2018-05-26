import React from 'react';
import { NavLink } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import {Aux, isAuthEnabled} from '../utils/generalhelper';

import {setInRoute, convertObjectToEncodedString} from '../utils/routeshelper';
import {apiGetCall} from '../api.js';
import { T } from '../utils/i18nhelper';
import { getUserInfo, getToken } from '../utils/GawatiAuthClient';

import '../css/Autosuggest.css';
import '../css/SiteSearchAutoComplete.css';
import 'font-awesome/css/font-awesome.css';


/**
 * Implementation that wraps React Auto-Suggest for use in the main search box
 * 
 * @class SiteSearchAutoComplete
 * @extends {React.Component}
 */
class SaveSearchAutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            value: '',
            suggestions: [],
            lang: this.props.lang,
            username: '',
            latest_search: []
        };
        this.lastRequestId = null;
        //this.clickedSuggestion = this.clickedSuggestion.bind(this);
    }

    /**
     * Makes an async request for search suggestions
     * 
     * @param {any} value 
     */
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
        let apiRecent = apiGetCall(
            'search-from-save-name', 
            {searchName: inputValue, userName: this.state.username}
        );
        axios.get(apiRecent)
            .then(response => {
                const items = response.data.data;
                this.setState({
                    loading: false,
                    suggestions: items
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
        this.getSuggestionsAsync(value);
    };

    shouldRenderSuggestions = (value) => {
        return value.trim().length > 2;
    }
      

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: []
        });
    };

    
    renderSuggestion = (suggestion) => {
        let data = JSON.parse(suggestion.data);
        let link = setInRoute("filter", {
                from: data.from,
                to: data.to,
                count: data.count,
                lang: data.lang,
                q: convertObjectToEncodedString(data.query)
            });
        return (
            <NavLink to={link}>
                 <div className="ui-ac-item-render">
                    <div className="ui-ac-item-render-content">
                    {suggestion.searchName}
                    </div>
                </div>
            </NavLink>
        );
    };

    getSuggestionValue = (suggestion) => suggestion.searchName;

    componentDidMount() {
        if (isAuthEnabled()) {
            if (getToken() != null) {
                getUserInfo()
                .success( (data) => {
                    console.log(" getUserName (data) = ", data);
                    this.setState({username: data.preferred_username});
                    
                    let apiSearch = apiGetCall(
                        'recent-search-from-save-name', {userName: this.state.username}
                    );
                    
                    axios.get(apiSearch, {
                    }) 
                    .then(response => {
                        this.setState({ latest_search: response.data.data});
                    })
                    .catch(function(error) {
                        console.log('There is some error' + error);
                    }); 
                })
                .error( (err) => {
                    this.setState({username: "guest"});
                    console.log(" getUserName (err) = ", err);
                });
            }
        }
    }

    getFilterRoute = (data) =>{
        data = JSON.parse(data);
        return setInRoute("filter", {
            from: data.from,
            to: data.to,
            count: data.count,
            lang: data.lang,
            q: convertObjectToEncodedString(data.query)
        });
    }

    render() {
        const { value, suggestions, loading} = this.state;
        const inputProps = {
          placeholder: T("type at least 3 letters"),
          value,
          loading: loading ? "yes" : "no",
          onChange: this.onChange
        };
        // Autosuggest will pass through all these props to the input.
        return (
            <Aux>
                <Autosuggest 
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps} />
                <div><b>Recent saved searches</b></div> 
                {this.state.latest_search.map(member =>
                    <div><NavLink to={this.getFilterRoute(member.data)}> {member.searchName} </NavLink></div>
                )}
              </Aux>
          );
      }
}

export default SaveSearchAutoComplete;
