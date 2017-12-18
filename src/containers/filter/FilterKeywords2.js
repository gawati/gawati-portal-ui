import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import ToggleDisplay from '../../component_utils/ToggleDisplay';
import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import {apiGetCall} from '../../api.js';
import axios from 'axios';

import 'react-select/dist/react-select.css';

class FilterKeywords extends BaseFilter {

    constructor(props) {
        super(props);
        this.state = {
			value: [],
            matches:[],
            createable: false,
            loading: false
        };
    }

    onChange = (value) =>
		this.setState({
			value: value,
		});


    getKeywords (input) {
        if (!input) {
			return Promise.resolve({ options: [] });
		} else {
            return Promise.resolve({ options: [
                {
                    value: "trade",
                    label: "Trade"
                },
                {
                    value: "goods",
                    label: "Goods"
                },
                {
                    value: "supplies",
                    label: "Supplies"
                }
            ] });
        }

		// let keywordMatches = apiGetCall(
        //     'keywords', {
        //         query : input
        //     } 
        // );
        // axios.get(keywordMatches)
        //     .then(response => {
        //         const matches = response.data;
        //         this.setState({
        //             loading: false,
        //             matches: matches,
        //         });
        //     })
        //     .catch(error => {
        //         console.log("error in keywords API", error);
        //     });
	}

    selectKeyword (value, event) {
        this.setState({
            value: value
        })
    }
    
    render() {
        const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;
        let filterType = this.props.filterType;
        let filter = this.props.filter;
        let keywords = coerceIntoArray(filter.keyword);
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <AsyncComponent
                    backspaceRemoves={true}
                    loadOptions={this.getKeywords}
                    multi={true}
                    onChange={this.onChange}
                    // onValueClick={this.selectKeyword}
                    value={this.state.value}
                    />
                <div className="grey-rule"/>
            </Aux>
        );              
    }
}


FilterKeywords.propTypes = {
        filterType: PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
        }).isRequired,
        filter: PropTypes.object.isRequired,
        showExpanded: PropTypes.bool.isRequired
    };

export default FilterKeywords;