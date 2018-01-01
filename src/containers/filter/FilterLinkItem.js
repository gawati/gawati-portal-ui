import React from 'react';
import { NavLink } from 'react-router-dom';

import { setInRoute, convertObjectToEncodedString } from '../../utils/routeshelper';

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

export  default FilterLinkItem;