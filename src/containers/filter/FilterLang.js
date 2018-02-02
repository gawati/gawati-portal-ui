import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import ToggleDisplay from '../../component_utils/ToggleDisplay';
import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

class FilterLang extends BaseFilter {
    
        toggleLangs = (langs) => 
            <Aux> {
                langs.slice(5, langs.length).map(
                    langObj =>
                    <li key={ `lang-${langObj.code}` }>
                        <NavLink to={ `/search/_lang/en/_count/10/_from/1/_to/10/_bylang/${langObj.code}/` }>{langObj['#text']} {roundto100Filter(parseInt(langObj.count))}</NavLink>
                    </li>
                ) 
            } </Aux>
        ;    
    
        listItem = (langObj) =>
            <li key={ `lang-${langObj.code}` }>
                <NavLink to={ `/search/_lang/en/_count/10/_from/1/_to/10/_bylang/${langObj.code}/` }>{langObj['#text']} {roundto100Filter(parseInt(langObj.count))}</NavLink>
            </li>
        ;
    
        render() {
            let filterType = this.props.filterType;
            let filter = this.props.filter;
            let langs = coerceIntoArray(filter.lang);
            return (
                <Aux>
                    <h2 className="small-heading">{filterType.label}</h2>
                    <ul> {
                        langs.slice(0, 4).map(
                            langObj =>
                            <li key={ `lang-${langObj.code}` }>
                                <NavLink to={ `/search/_lang/en/_count/10/_from/1/_to/10/_bylang/${langObj.code}/` }>{langObj['#text']} {roundto100Filter(parseInt(langObj.count))}</NavLink>
                            </li>
                        )
                    } {
                        langs.length > 5  ?
                        <li key="lang-see-more" className="click-more" onClick={() => this.setState({showExpanded: !this.state.showExpanded})}> + More
                          <ToggleDisplay tag="ul"  show={this.state.showExpanded}  >
                            {this.toggleLangs(langs)}
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
    

FilterLang.propTypes = {
        filterType: PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
        }).isRequired,
        filter: PropTypes.object.isRequired,
        showExpanded: PropTypes.bool.isRequired
    };

export default FilterLang;