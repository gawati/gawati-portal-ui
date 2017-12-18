import React from 'react';
import axios from 'axios';

import FilterCountry from './FilterCountry';
import FilterDate from './FilterDate';
import FilterLang from './FilterLang';
import FilterKeywords from './FilterKeywords';
//import FilterCountry2 from './FilterCountry2';

// import FilterCountry from './FilterCountry2';
// import FilterDate from './FilterDate2';
// import FilterLang from './FilterLang2';
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
                    { /** <FilterCountry2  filterType={filterType.FILTER_COUNTRY}  filter={this.getFilterFor('FILTER_COUNTRY')} showExpanded={ false } /> **/ }
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