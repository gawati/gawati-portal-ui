import React from 'react';

class SearchCategoryArea extends React.Component {
    render() {
        const {category, term} = this.props.match.params;
        return (
            <div className="container-fluid">
                <div>
                    <h2>Full Results for Search Cateogry `{category}` for term `{term}`</h2>                    
                </div>
            </div>
        );
    }
}

export default SearchCategoryArea;