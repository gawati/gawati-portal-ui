import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import axios from 'axios';

import BaseFilter from './BaseFilter';

import {apiGetCall} from '../../api.js';
import {Aux} from '../../utils/generalhelper';
import { convertEncodedStringToObject } from '../../utils/routeshelper';

import 'react-select/dist/react-select.css';

class FilterKeywords extends BaseFilter {

    constructor(props) {
        super(props);
        this.getKeywords = this.getKeywords.bind(this);
    }

    handleSelectChange = (value) => {
        this.props.setFilterValue('keywords', value.map( chosen => chosen.value ));
    }

    getKeywords(input) {
        if (!input) {
			return Promise.resolve({ options: [] });
		} else {
            let keywordApi = apiGetCall(
                'keyword', {
                    kw : input
                } 
            );
            return axios.get(keywordApi)
                .then(response => {
                    console.log(" MATCHES : ", response.data.matches);
                    return { options: response.data.matches };
                })
                .catch(error => {
                    console.log("error in keywords API", error);
                });
        }
	}

    render() {
        const AsyncComponent = Select.Async;
        let filterType = this.props.filterType;
        let value = [];
        if (this.props.match.params.q) {
            var search = convertEncodedStringToObject(this.props.match.params.q);
            if (search.keywords) {
              value = search.keywords.map(
                     (keyword) => {
                         return {value: keyword}
                     }
                );
            }
        }
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <AsyncComponent
                    backspaceRemoves={true}
                    loadOptions={this.getKeywords}
                    multi={true}
                    onChange={this.handleSelectChange}
                    value={value}
                    labelKey='showAs'
                    valueKey='value'
                    matchProp='label'
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