import React from 'react';

class FilterCountry2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			value: [],
        };
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }


    handleSelectChange = (value) => 
            this.setState({value});
    
    render () {
        let filterType = this.props.filterType;
        let filter = this.props.filter ;
        let countries = coerceIntoArray(filter.country); 
        
        /*.map(function(countryObj) {
            return {
                label: countryObj['#text'],
                value: countryObj['code'],
                count: countryObj['count']
            }
        })*/        
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <Select
                    closeOnSelect={false}
                    disabled={false}
                    multi
                    onChange={this.handleSelectChange}
                    // optionComponent={CountrySelectOption}
                    options={this.countries}
                    placeholder="Select countries"
                    removeSelected={true}
                    rtl={false}
                    simpleValue
                    value={this.state.value}
                />
                <div className="grey-rule"/>
            </Aux>
        );
    }
}
