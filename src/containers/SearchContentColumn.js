import React from 'react';
import axios from 'axios';

import DivFeed from '../components/DivFeed';

import '../css/ListingContentColumn.css';



const UnderDevelopment = () => 
    <div className={ `left col-9`}>
        <div className="search-result">
        Under Development
        </div>
    </div>;

class SearchContentColumn extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <UnderDevelopment />
        );
    }
}

/*
const Loading = ({tab}) => 
    <div className={ `tab-pane tab-active` } data-tab="t`${tab}`">
        Loading...
    </div>;
*/

export default SearchContentColumn;

