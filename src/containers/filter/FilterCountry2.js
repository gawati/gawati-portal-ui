import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

class FilterCountry extends BaseFilter {

    constructor(props) {
        super(props);
        this.countries = 
            coerceIntoArray(props.filter.country).map( 
                countryObj => ({
                    label: countryObj['#text'] + ' (' + roundto100Filter(countryObj['count']) + ')',
                    value: countryObj['code']
                })
            );    
        
    }
    
    handleSelectChange = (value) => {
        // value contains the chosen object(s)
        console.log( " VALUE ___ ", value);
        console.log( " CHOSEN ", value.map( chosen => chosen.value ));
        // send an array of countries 
        this.props.setFilterValue('countries', value.map( chosen => chosen.value ));
    }

    /**
     * !+KOHSAH(2017-12-26)
     *  -- changed from simpleValue to object based value selection since countries can have commas
     *  -- moved countries coercer into constructor, so it isnt called everytime render is called.
     */
    render () {
        let filterType = this.props.filterType;
        let countries = this.countries;
        //let filter = this.props.filter ;
        //let countries = coerceIntoArray(filter.country).map( 
        //    countryObj => ({
        //        label: countryObj['#text'] + ' (' + roundto100Filter(countryObj['count']) + ')',
        //        value: countryObj['code']
        //    })
        //);    
        let value = [];
        if (this.props.match.params.search) {
            // if there is a search url param look for the countries filter
            var search = JSON.parse(decodeURIComponent(this.props.match.params.search));
            if (search.countries) {
              // if there is a countries filter, then it has the country code, we need to send the full object 
              // for react-select to set the selection, so for each code find the countries matching and send an 
              // array of these country objects as the value with the updated count
              value = search.countries.map(
                    countryCode => countries.find( country => country.value === countryCode)
                );
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
                    value={value}
                />
                <div className="grey-rule"/>
            </Aux>
        );
    }
}

export default FilterCountry;
