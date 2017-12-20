import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

class FilterCountry extends BaseFilter {

    constructor(props) {
        super(props);
        this.state = {

            value: this.props.match.params.country,
            loading: true,
            listing: undefined
        };
    }

    handleSelectChange = (value) => {
        this.setState({value});
        this.props.setCountryValue(value)
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
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <Select
                    closeOnSelect={false}
                    disabled={false}
                    multi
                    onChange={this.handleSelectChange}
                    // optionComponent={CountrySelectOption}
                    options={countries}
                    placeholder="Select countries"
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

class CountrySelectOption extends React.Component {

    handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
    }

    handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
    }
    
    handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
    }

    onCheckChange(value) {
        // do something
    }
    
    render () {
		return (
			<div className="Select-value" 
                title={this.props.option.label}
                style={{display: 'block'}}
                onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				>
                <input type="checkbox" defaultChecked={false} onChange={this.onCheckChange} style={{float:'left'}}/>   
				<span className="Select-value-label">
				    {this.props.option.label}	
				</span>
			</div>
		);
	}
}

CountrySelectOption.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired
};


class CountrySelectValue extends React.Component{

	render() {
		return (
			<div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					{this.props.value}
					{this.props.children}
				</span>
			</div>
		);
	}
}

CountrySelectValue.propTypes = {
    children: PropTypes.node,
    placeholder: PropTypes.string,
    value: PropTypes.object
};

export default FilterCountry;
