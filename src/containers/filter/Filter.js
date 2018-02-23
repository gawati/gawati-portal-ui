import React from 'react';
import axios from 'axios';

// !+ERROR_DEPRECATED_USE(AH, 2017-12-15) This createClass should not be used,
// it is from React 15, and is incompatible with React 16 since using it requires 
// importing the create-react-class library, which has older dependencies and causes startup to 
// fail from a clean build. We write everything as ES6 / ES2015
// so this syntax should not be used. Moving to a branch, and revering package.json changes
//import Select from 'react-select';
//import createClass from 'create-react-class';
//import 'react-select/dist/react-select.css';

import FilterCountry from './FilterCountry';
import FilterDate from './FilterDate';
import FilterLang from './FilterLang';
import FilterKeywords from './FilterKeywords';
//import FilterCountry2 from './FilterCountry2';

import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';
import {filterTypes} from '../../constants.js';
import {apiGetCall} from '../../api.js';



/** *
class FilterCountry2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			value: [],
        };
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    countries = coerceIntoArray(this.props.filter.country).map(function(countryObj) {
        return {
            label: countryObj['#text'],
            value: countryObj['code'],
            count: countryObj['count']
        }
    })
    handleSelectChange (value) {
        this.setState({value});
    }
    render () {
        return (
            <Aux>
                <h2 className="small-heading">{this.props.filterType.label}</h2>
                <Select
                    closeOnSelect={false}
                    disabled={false}
                    multi
                    onChange={this.handleSelectChange}
                    // optionComponent={CountrySelectOption}
                    options={this.countries}
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

const CountrySelectOption = createClass({
	propTypes: {
		children: PropTypes.node,
		className: PropTypes.string,
		isDisabled: PropTypes.bool,
		isFocused: PropTypes.bool,
		isSelected: PropTypes.bool,
		onFocus: PropTypes.func,
		onSelect: PropTypes.func,
		option: PropTypes.object.isRequired,
	},
	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
    onCheckChange : function (value) {
    },
	render () {
		return (
			<div className="Select-value" 
                title={this.props.option.label}
                style={{display: 'block'}}
                onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={this.props.option.title}>
                
                <input type="checkbox" defaultChecked={false} onChange={this.onCheckChange} style={{float:'left'}}/>   
				<span className="Select-value-label">
				    {this.props.option.label}	
				</span>
			</div>
		);
	}
});

const CountrySelectValue = createClass({
	propTypes: {
		children: PropTypes.node,
		placeholder: PropTypes.string,
		value: PropTypes.object
	},
	render () {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};
		return (
			<div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					{this.props.value}
					{this.props.children}
				</span>
			</div>
		);
	}
});
**/
    


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