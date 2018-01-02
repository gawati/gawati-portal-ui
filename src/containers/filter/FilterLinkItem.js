import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { setInRoute, convertObjectToEncodedString } from '../../utils/routeshelper';
/**
 * Called by FilterLinkItems to render an individual link
 * @param {object} item to render
 * @param {type} type of filter item to render 
 */
const FilterLinkItem = ({ item, type }) => {
    let obj = {} ;
    obj[type] = [item.value];
    console.log( " LINKITEM OBJ ", obj);
    const url = setInRoute(
        'filter', 
        {
            lang: 'en', 
            from: 1, 
            count: 10, 
            to: 10, 
            q: convertObjectToEncodedString(
                obj
            )
        } 
    );
    return (
        <NavLink to={ url }>{item.label}</NavLink>
    );
};

FilterLinkItem.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};

export  default FilterLinkItem;