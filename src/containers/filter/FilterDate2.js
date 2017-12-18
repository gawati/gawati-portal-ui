import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

class FilterDate extends BaseFilter {

    constructor(props) {
        super(props);
        this.state = {
			value: [],
        };
    } 

    handleSelectChange = (value) => 
        this.setState({value});

    render() {
        let filterType = this.props.filterType;
        let filter = this.props.filter;
        let dates = coerceIntoArray(filter.year).map( 
            year => ({
                label: year['year'] + ' (' + year['count'] + ')',
                value: year['year']
            })
        );
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <Select
                    closeOnSelect={false}
                    disabled={false}
                    multi
                    onChange={this.handleSelectChange}
                    options={dates}
                    placeholder="Select Year"
                    removeSelected={true}
                    rtl={false}
                    simpleValue
                    value={this.state.value}
                />
                <div className="grey-rule"/>
            </Aux>
        );        
    }
}

FilterDate.propTypes = {
        filterType: PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
        }).isRequired,
        filter: PropTypes.object.isRequired,
        showExpanded: PropTypes.bool.isRequired
    };

export default FilterDate;