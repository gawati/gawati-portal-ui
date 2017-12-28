import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// import FilterCountry from './FilterCountry';
import FilterDate from './FilterDate';
// import FilterLang from './FilterLang';
import FilterKeywords from './FilterKeywords';

import FilterCountry from './FilterCountry2';
// import FilterDate from './FilterDate2';
import FilterLang from './FilterLang2';
// import FilterKeywords from './FilterKeywords2';

import {filterTypes} from '../../constants.js';
import {apiGetCall} from '../../api.js';

import {Aux} from '../../utils/generalhelper';

/**
 * This class provides the UI filter component provided on the right
 * 
 * @class Filter
 * @extends {React.Component}
 */
class Filter extends React.Component {
    constructor(props) {
        super(props);
        var search = {};
        if (this.props.match.params.search) {
            search = JSON.parse(decodeURIComponent(this.props.match.params.search)).search;
        }

        this.state = {
            loading: true,
            filter: [],
            yearValue: '',
            keyValue: '',
            search: search
        };
        // this.setCountryValue = this.setCountryValue.bind(this);
        // this.setLangValue = this.setLangValue.bind(this);
        // this.gotoSearchPage = this.gotoSearchPage.bind(this);
    }

    setFilterValue = (filterName, filterValue) => {
        console.log(" STATE.SEARCH ", this.state.search);
        var filters = Object.assign({}, this.state.search);
        filters[filterName] = filterValue ; 
        //filters[filterName] = filterValue.split().map(
        //    (value) => {return {code: value};} 
        //)
        this.setState({search: filters});
        setTimeout(() => {
            this.gotoSearchPage();
        });
        
    }

    gotoSearchPage = () => {
        var paramsString = '/search/_lang/eng/_count/10/_from/1/_to/10/json/';
        // var search = {
        //     search: {
        //         countries: this.state.countryValue.split(',').map((country) => {
        //             return {
        //                 code: country
        //             }
        //         }),
        //         langs: this.state.langValue.split(',').map((lang) => {
        //             return {
        //                 code: lang
        //             }
        //         })
                
        //     }
        // }
        const { router } = this.context;
        router.history.push(paramsString + encodeURIComponent(JSON.stringify(this.state.search)));    
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
                    <FilterCountry  filterType={filterType.FILTER_COUNTRY}  filter={this.getFilterFor('FILTER_COUNTRY')} showExpanded={ false } setFilterValue={ this.setFilterValue } match={this.props.match}/>
                    <FilterLang  filterType={filterType.FILTER_LANG}  filter={this.getFilterFor('FILTER_LANG')} showExpanded={ false }  setFilterValue={ this.setFilterValue } match={this.props.match}/>
                    <FilterKeywords   filterType={filterType.FILTER_KEYWORD}  filter={this.getFilterFor('FILTER_KEYWORD')} showExpanded={ false } />
                </Aux>
            );        
        }
    }

};


Filter.contextTypes = {
    router: PropTypes.object
}

export default Filter;