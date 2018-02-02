import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import ToggleDisplay from '../../component_utils/ToggleDisplay';
import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

class FilterDate extends BaseFilter {
    
        listItem = (dateObj) =>
            <li key={ `year-${dateObj.year}` }>
                <NavLink to={ `/search/_lang/en/_count/10/_from/1/_to/10/_byyear/${dateObj.year}/` }>
                    {dateObj.year} {roundto100Filter(parseInt(dateObj.count, 10))}
                </NavLink>
            </li>
        ;       
    
        toggleDates = (dates) => 
            <Aux> {
                dates.slice(5, dates.length).map(
                    this.listItem
                ) 
            } </Aux>
        ;
    
        render() {
            let filterType = this.props.filterType;
            let filter = this.props.filter;
            let dates = coerceIntoArray(filter.year);
            return (
                <Aux>
                    <h2 className="small-heading">{filterType.label}</h2>
                    <ul className="since"> {
                        dates.slice(0, 4).map(
                            this.listItem
                        )
                     } {
                        dates.length > 5  ?
                        <li key="year-see-more" className="click-more" onClick={() => this.setState({showExpanded: !this.state.showExpanded})}> + More
                          <ToggleDisplay tag="ul"  show={this.state.showExpanded}  >
                            {this.toggleDates(dates)}
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

FilterDate.propTypes = {
        filterType: PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
        }).isRequired,
        filter: PropTypes.object.isRequired,
        showExpanded: PropTypes.bool.isRequired
    };

export default FilterDate;