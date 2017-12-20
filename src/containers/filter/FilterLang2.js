import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

class FilterLang extends BaseFilter {

    handleSelectChange = (value) => {
        this.setState({value});
        this.props.setLangValue(value);
    }
    
    render() {
        let filterType = this.props.filterType;
        let filter = this.props.filter;
        let langs = coerceIntoArray(filter.lang).map( 
                lang => ({
                label: lang['#text'] + ' (' + roundto100Filter(lang['count']) + ')',
                value: lang['code']
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
                    options={langs}
                    placeholder="Select language"
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

FilterLang.propTypes = {
        filterType: PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
        }).isRequired,
        filter: PropTypes.object.isRequired,
        showExpanded: PropTypes.bool.isRequired
    };

FilterLang.contextTypes = {
  router: PropTypes.object
}    

export default FilterLang;