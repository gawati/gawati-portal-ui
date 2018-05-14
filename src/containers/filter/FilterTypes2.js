import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import BaseFilter from './BaseFilter';
import FilterLinkItems from './FilterLinkItems';

import {T} from '../../utils/i18nhelper';
import { Aux, coerceIntoArray, roundto100Filter } from '../../utils/generalhelper';
import { convertEncodedStringToObject } from '../../utils/routeshelper';

import 'react-select/dist/react-select.css';

class FilterTypes extends BaseFilter {

    constructor(props) {
        super(props);
        this.types = 
            coerceIntoArray(props.filter.type).map( 
                typeObj => ({
                    label: typeObj['type'] + ' (' + roundto100Filter(typeObj['count']) + ')',
                    value: typeObj['type']
                })
            );
    }
    
    handleSelectChange = (value) => {
        this.props.setFilterValue('types', value.map( chosen => chosen.value ));
    }

    /**
     * !+KOHSAH(2017-12-26)
     *  -- changed from simpleValue to object based value selection since countries can have commas
     *  -- moved countries coercer into constructor, so it isnt called everytime render is called.
     */
    render () {
        let filterType = this.props.filterType;
        let types = this.types;
        let value = [];
        if (this.props.match.params.q) {
            // if there is a search url param look for the countries filter
            var search = convertEncodedStringToObject(this.props.match.params.q);
            if (search.types) {
              // if there is a countries filter, then it has the country code, we need to send the full object 
              // for react-select to set the selection, so for each code find the countries matching and send an 
              // array of these country objects as the value with the updated count.
              // we need to do this to set the display count "Kenya 200+" along with the country code
              value = search.types.map(
                    typeCode => types.find( type => type.value === typeCode)
                );
            }
        }
        return (
            <Aux>
                <h2 className="small-heading">{T(filterType.label)}</h2>
                <Select
                    closeOnSelect={false}
                    disabled={false}
                    multi
                    onChange={this.handleSelectChange}
                    options={types}
                    placeholder={T("Select document types")}
                    removeSelected={true}
                    rtl={false}
                    value={value}
                />
                <small>
                    <FilterLinkItems items={ types } type="types" lang={ this.props.match.params.lang }/>...
                </small>
                <div className="grey-rule"/>
            </Aux>
        );
    }
}

FilterTypes.propTypes = {
    filterType: PropTypes.shape({
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
    }).isRequired,
    filter: PropTypes.object.isRequired,
    setFilterValue: PropTypes.func.isRequired,
    showExpanded: PropTypes.bool.isRequired
};

export default FilterTypes;
