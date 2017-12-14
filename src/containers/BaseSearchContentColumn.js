import React from 'react';
import axios from 'axios';
import {apiGetCall} from '../api';
import {isInt, coerceIntoArray} from '../utils/generalhelper';
import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';

import '../css/ListingContentColumn.css';

class BaseSearchContentColumn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            loading: true,
            listing: undefined
        };
        Object.assign(this.state, this.props.match.params);
    }

    onChangePage(newPage) {
        console.log (" NEW PAGE ", newPage);
        this.setState({loading: true});
        this.getSearch(newPage);
    }


};

export default BaseSearchContentColumn;