import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import ToggleDisplay from '../../component_utils/ToggleDisplay';
import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

class FilterCountry extends BaseFilter {
    
        listItem = (countryObj) =>
            <li key={ `country-${countryObj.code}` }>
                <NavLink to={ `/search/_lang/eng/_count/10/_from/1/_to/10/_bycountry/${countryObj.code}/` }>{countryObj['#text']} {roundto100Filter(parseInt(countryObj.count, 10))}</NavLink>
            </li>
        ;   
    
        toggleCountries = (countries) => 
        <Aux> {
            countries.slice(5, countries.length).map(
                this.listItem
            ) 
        } </Aux>
        ;    
    
        render() {
            let filterType = this.props.filterType;
            let filter = this.props.filter;
            let countries = coerceIntoArray(filter.country);
            return (
                <Aux>
                    <h2 className="small-heading">{filterType.label}</h2>
                    <ul> {
                        countries.slice(0, 4).map(
                            this.listItem
                        )
                    } {
                        countries.length > 5  ?
                        <li key="country-see-more" className="click-more" onClick={() => this.setState({showExpanded: !this.state.showExpanded})}> + More
                          <ToggleDisplay tag="ul"  show={this.state.showExpanded}  >
                            {this.toggleCountries(countries)}
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


FilterCountry.propTypes =  {
        filterType: PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
        }).isRequired,
        filter: PropTypes.object.isRequired,
        showExpanded: PropTypes.bool.isRequired
    };

export default FilterCountry;