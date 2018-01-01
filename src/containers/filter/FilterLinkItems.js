import React from 'react';

import FilterLinkItem from './FilterLinkItem';

import { Aux } from '../../utils/generalhelper';

const FilterLinkItems = ({ items, type }) => 
    <Aux>
    {
        items.slice(0,2).map( 
            item => <FilterLinkItem key={ `url-${type}-${item.value}` } item={ item } type={ type } />
        ).reduce(
            (prev, curr) => [prev, ', ', curr]
        )                    
    }
    </Aux>     
;

export default FilterLinkItems;