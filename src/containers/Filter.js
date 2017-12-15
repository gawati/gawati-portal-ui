import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import ToggleDisplay from '../component_utils/ToggleDisplay';
import {Aux, coerceIntoArray, roundto100Filter} from '../utils/generalhelper';
import {filterTypes} from '../constants.js';
import {apiGetCall} from '../api.js';

class BaseFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showExpanded : this.props.showExpanded
        };
    }
}

class FilterDate extends BaseFilter {

    listItem = (dateObj) =>
        <li key={ `year-${dateObj.year}` }>
            <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_byyear/${dateObj.year}/` }>
                {dateObj.year} {roundto100Filter(parseInt(dateObj.count))}
            </NavLink>
        </li>
    ;       

    toggleDates = (dates) => 
        <Aux> {
            dates.slice(5, dates.length).map(
                this.listItem
            ) 
        } </Aux>
    ;

    render() {
        let filterType = this.props.filterType;
        let filter = this.props.filter;
        let dates = coerceIntoArray(filter.year);
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <ul className="since"> {
                    dates.slice(0, 4).map(
                        this.listItem
                    )
                 } {
                    dates.length > 5  ?
                    <li key="year-see-more" className="click-more" onClick={() => this.setState({showExpanded: !this.state.showExpanded})}> + More
                      <ToggleDisplay tag="ul"  show={this.state.showExpanded}  >
                        {this.toggleDates(dates)}
                        </ToggleDisplay>
                    </li> :
                    <noscript />
                 }
                </ul>
                <div className="grey-rule"/>
            </Aux>
            );        
    }
}

class FilterCountry extends React.Component {

    listItem = (countryObj) =>
        <li key={ `country-${countryObj.code}` }>
            <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bycountry/${countryObj.code}/` }>{countryObj['#text']} {roundto100Filter(parseInt(countryObj.count))}</NavLink>
        </li>
    ;   

    toggleCountries = (countries) => 
    <Aux> {
        countries.slice(5, countries.length).map(
            this.listItem
        ) 
    } </Aux>
    ;    

    render() {
        let filterType = this.props.filterType;
        let filter = this.props.filter;
        let countries = coerceIntoArray(filter.country);
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <ul> {
                    countries.slice(0, 4).map(
                        this.listItem
                    )
                } {
                    countries.length > 5  ?
                    <li key="country-see-more" className="click-more" onClick={() => this.setState({showExpanded: !this.state.showExpanded})}> + More
                      <ToggleDisplay tag="ul"  show={this.state.showExpanded}  >
                        {this.toggleCountries(countries)}
                        </ToggleDisplay>
                    </li> :
                    <noscript />
                 }
                </ul>
                <div className="grey-rule"/>
            </Aux>
        );
    }
}
  

class FilterLang extends BaseFilter {

    toggleLangs = (langs) => 
        <Aux> {
            langs.slice(5, langs.length).map(
                langObj =>
                <li key={ `lang-${langObj.code}` }>
                    <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bylang/${langObj.code}/` }>{langObj['#text']} {roundto100Filter(parseInt(langObj.count))}</NavLink>
                </li>
            ) 
        } </Aux>
    ;    

    listItem = (langObj) =>
        <li key={ `lang-${langObj.code}` }>
            <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bylang/${langObj.code}/` }>{langObj['#text']} {roundto100Filter(parseInt(langObj.count))}</NavLink>
        </li>
    ;

    render() {
        let filterType = this.props.filterType;
        let filter = this.props.filter;
        let langs = coerceIntoArray(filter.lang);
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <ul> {
                    langs.slice(0, 4).map(
                        langObj =>
                        <li key={ `lang-${langObj.code}` }>
                            <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bylang/${langObj.code}/` }>{langObj['#text']} {roundto100Filter(parseInt(langObj.count))}</NavLink>
                        </li>
                    )
                } {
                    langs.length > 5  ?
                    <li key="lang-see-more" className="click-more" onClick={() => this.setState({showExpanded: !this.state.showExpanded})}> + More
                      <ToggleDisplay tag="ul"  show={this.state.showExpanded}  >
                        {this.toggleLangs(langs)}
                        </ToggleDisplay>
                    </li> :
                    <noscript />
                 }
                </ul>
                <div className="grey-rule"/>
            </Aux>
        );                
    }
}



class FilterKeywords extends BaseFilter {

    listItem = (keywordObj) =>
        <li key={ `kwf-${keywordObj.value}` }>
            <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bysubject/${keywordObj.value}/` }>{keywordObj['showAs']} {roundto100Filter(parseInt(keywordObj.count))}</NavLink>
        </li>
    ;

    toggleKeywords = (keywords) => 
        <Aux> {
            keywords.slice(5, keywords.length).map(
                keywordObj =>
                <li key={ `kwf-${keywordObj.value}` }>
                    <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bysubject/${keywordObj.value}/` }>{keywordObj['showAs']} {roundto100Filter(parseInt(keywordObj.count))}</NavLink>
                </li>
            ) 
        } </Aux>
    ;    

    render() {
        let filterType = this.props.filterType;
        let filter = this.props.filter;
        let keywords = coerceIntoArray(filter.keyword);
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <ul> {
                    keywords.slice(0, 4).map(
                        keywordObj =>
                        <li key={ `kwf-${keywordObj.value}` }>
                            <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bysubject/${keywordObj.value}/` }>{keywordObj['showAs']} {roundto100Filter(parseInt(keywordObj.count))}</NavLink>
                        </li>
                    )  
                } {
                    keywords.length > 5  ?
                    <li key="keyword-see-more" className="click-more" onClick={() => this.setState({showExpanded: !this.state.showExpanded})}> + More
                      <ToggleDisplay tag="ul"  show={this.state.showExpanded}  >
                        {this.toggleKeywords(keywords)}
                        </ToggleDisplay>
                    </li> :
                    <noscript />
                 }
                </ul>
                <div className="grey-rule"/>
            </Aux>
        );              
    }
}

/*
const FilterKeywords = ({filterType, filter}) => {
    let keywords = coerceIntoArray(filter.keyword);
    return (
        <Aux>
            <h2 className="small-heading">{filterType.label}</h2>
            <ul> {
                keywords.map(
                    keywordObj =>
                    <li key={ `lang-${keywordObj.value}` }>
                        <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bysubject/${keywordObj.value}/` }>{keywordObj['showAs']} {roundto100Filter(parseInt(keywordObj.count))}</NavLink>
                    </li>
                )  
            }
            </ul>
            <div className="grey-rule"/>
        </Aux>
    );      
};
*/

FilterLang.propTypes = FilterKeywords.propTypes = FilterCountry.propTypes =  FilterDate.propTypes = {
    filterType: PropTypes.shape({
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
    }).isRequired,
    filter: PropTypes.object.isRequired,
    showExpanded: PropTypes.bool.isRequired
};

/**
 * This class provides the UI filter component provided on the right
 * 
 * @class Filter
 * @extends {React.Component}
 */
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            filter: []
        };
    }

    /**
     * Queries the service for the short filter cache.
     * 
     * @memberof Filter
     */
    getFilters() {
        let shortFilterCache = apiGetCall(
            'smart-filter-cache', {}
        );
        axios.get(shortFilterCache)
            .then(response => {
                const content = response.data;
                this.setState({
                    loading: false,
                    filter: content.filter
                });
            })
            .catch(function(error) {
                console.log("error in getFilters()", error);
            });
    }

    componentDidMount() {
        this.getFilters();
    }

    getFilterFor = (filterType ) => this.state.filter.find(obj => obj.name === filterTypes()[filterType].key);

    render() {
        if (this.state.loading === true) {
            return (
                <Aux>
                    <div>Loading ... </div>
                </Aux>
            );
        } else {
            let filterType = filterTypes();
            return (
                <Aux>
                    <FilterDate filterType={filterType.FILTER_DATE} filter={this.getFilterFor('FILTER_DATE')} showExpanded={ false } />
                    <FilterCountry  filterType={filterType.FILTER_COUNTRY}  filter={this.getFilterFor('FILTER_COUNTRY')} showExpanded={ false } />
                    <FilterLang  filterType={filterType.FILTER_LANG}  filter={this.getFilterFor('FILTER_LANG')} showExpanded={ false }  />
                    <FilterKeywords   filterType={filterType.FILTER_KEYWORD}  filter={this.getFilterFor('FILTER_KEYWORD')} showExpanded={ false } />
                </Aux>
            );        
        }
    }

};


export default Filter;