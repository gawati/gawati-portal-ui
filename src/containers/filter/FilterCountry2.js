import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

class FilterCountry extends BaseFilter {

    handleSelectChange = (value) => {
        this.props.setFilterValue('countries', value)
    }

    render () {
        let filterType = this.props.filterType;
        let filter = this.props.filter ;
        let countries = coerceIntoArray(filter.country).map( 
            countryObj => ({
                label: countryObj['#text'] + ' (' + roundto100Filter(countryObj['count']) + ')',
                value: countryObj['code']
            })
        );    
        let value = '';
        if (this.props.match.params.search) {
            var search = JSON.parse(decodeURIComponent(this.props.match.params.search))
            if (search.countries) {
                value = search.countries.map(
                        (country) => country.code 
                    ).join(',')
            }
        }
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <Select
                    closeOnSelect={false}
                    disabled={false}
                    multi
                    onChange={this.handleSelectChange}
                    options={countries}
                    placeholder="Select countries"
                    removeSelected={true}
                    rtl={false}
                    simpleValue
                    value={value}
                />
                <div className="grey-rule"/>
            </Aux>
        );
    }
}

export default FilterCountry;
