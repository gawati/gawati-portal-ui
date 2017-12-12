import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import {Aux, coerceIntoArray, roundto100Filter} from '../utils/generalhelper';
import {filterTypes} from '../constants.js';
import {apiGetCall} from '../api.js';


const FilterDate = ({filterType, filter}) => {
    let dates = coerceIntoArray(filter.year);
    return (
    <Aux>
        <h2 className="small-heading">{filterType.label}</h2>
        <ul className="since"> {
            dates.map(
                dateObj => 
                <li key={ `year-${dateObj.year}` }>
                    <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_byyear/${dateObj.year}/` }>{dateObj.year} {roundto100Filter(parseInt(dateObj.count))}</NavLink>
                </li>       
            )
         }
        </ul>
        <div className="grey-rule"/>
    </Aux>
    );
};

const FilterCountry = ({filterType, filter}) => {
    let countries = coerceIntoArray(filter.country);
    return (
        <Aux>
            <h2 className="small-heading">{filterType.label}</h2>
            <ul> {
                countries.map(
                    countryObj =>
                    <li key={ `country-${countryObj.code}` }>
                        <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bycountry/${countryObj.code}/` }>{countryObj['#text']} {roundto100Filter(parseInt(countryObj.count))}</NavLink>
                    </li>
                )
            }
            </ul>
            <div className="grey-rule"/>
        </Aux>
    );
};
    
const FilterLang = ({filterType, filter}) => {
    let langs = coerceIntoArray(filter.lang);
    return (
        <Aux>
            <h2 className="small-heading">{filterType.label}</h2>
            <ul> {
                langs.map(
                    langObj =>
                    <li key={ `lang-${langObj.code}` }>
                        <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bylang/${langObj.code}/` }>{langObj['#text']} {roundto100Filter(parseInt(langObj.count))}</NavLink>
                    </li>
                )
            }
            </ul>
            <div className="grey-rule"/>
        </Aux>
    );        
};


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

FilterLang.propTypes = FilterKeywords.propTypes = FilterCountry.propTypes =  FilterDate.propTypes = {
    filterType: PropTypes.shape({
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
    }).isRequired,
    filter: PropTypes.object.isRequired
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
            'short-filter-cache', {}
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
                    <FilterDate filterType={filterType.FILTER_DATE} filter={this.getFilterFor('FILTER_DATE')} />
                    <FilterCountry  filterType={filterType.FILTER_COUNTRY}  filter={this.getFilterFor('FILTER_COUNTRY')} />
                    <FilterLang  filterType={filterType.FILTER_LANG}  filter={this.getFilterFor('FILTER_LANG')} />
                    <FilterKeywords   filterType={filterType.FILTER_KEYWORD}  filter={this.getFilterFor('FILTER_KEYWORD')} />
                </Aux>
            );        
        }
    }

};


export default Filter;