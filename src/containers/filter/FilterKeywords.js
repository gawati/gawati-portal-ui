import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import ToggleDisplay from '../../component_utils/ToggleDisplay';
import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

class FilterKeywords extends BaseFilter {
    
        listItem = (keywordObj) =>
            <li key={ `kwf-${keywordObj.value}` }>
                <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bysubject/${keywordObj.value}/` }>{keywordObj['showAs']} {roundto100Filter(parseInt(keywordObj.count, 10))}</NavLink>
            </li>
        ;
    
        toggleKeywords = (keywords) => 
            <Aux> {
                keywords.slice(5, keywords.length).map(
                    keywordObj =>
                    <li key={ `kwf-${keywordObj.value}` }>
                        <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bysubject/${keywordObj.value}/` }>{keywordObj['showAs']} {roundto100Filter(parseInt(keywordObj.count, 10))}</NavLink>
                    </li>
                ) 
            } </Aux>
        ;    
    
        render() {
            let filterType = this.props.filterType;
            let filter = this.props.filter;
            let keywords = coerceIntoArray(filter.keyword);
            return (
                <Aux>
                    <h2 className="small-heading">{filterType.label}</h2>
                    <ul> {
                        keywords.slice(0, 4).map(
                            keywordObj =>
                            <li key={ `kwf-${keywordObj.value}` }>
                                <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bysubject/${keywordObj.value}/` }>{keywordObj['showAs']} {roundto100Filter(parseInt(keywordObj.count, 10))}</NavLink>
                            </li>
                        )  
                    } {
                        keywords.length > 5  ?
                        <li key="keyword-see-more" className="click-more" onClick={() => this.setState({showExpanded: !this.state.showExpanded})}> + More
                          <ToggleDisplay tag="ul"  show={this.state.showExpanded}  >
                            {this.toggleKeywords(keywords)}
                            </ToggleDisplay>
                        </li> :
                        <noscript />
                     }
                    </ul>
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