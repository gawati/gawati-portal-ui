import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

// rewritten react 16 style
class FilterCountry2 extends BaseFilter {
    constructor(props) {
        super(props);
        this.state = {
			value: [],
        };
        // this explicit bind is not required
        //this.handleSelectChange = this.handleSelectChange.bind(this)
    }


    handleSelectChange = (value) => 
            this.setState({value});
    
    render () {
        let filterType = this.props.filterType;
        let filter = this.props.filter ;
        let countries = coerceIntoArray(filter.country).map( 
                countryObj => ({
                label: countryObj['#text'],
                value: countryObj['code'],
                count: countryObj['count']
            })
        );    
        return (
            <Aux>
                <h2 className="small-heading">{filterType.label}</h2>
                <Select
                    closeOnSelect={false}
                    disabled={false}
                    multi
                    onChange={this.handleSelectChange}
                    // optionComponent={CountrySelectOption}
                    options={countries}
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

class CountrySelectOption extends React.Component {

    constructor(props) {
        super(props);
    }
    
    handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
    }

    handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
    }
    
    handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
    }

    onCheckChange(value) {
        // do something
    }
    
    render () {
		return (
			<div className="Select-value" 
                title={this.props.option.label}
                style={{display: 'block'}}
                onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={this.props.option.title}>
                <input type="checkbox" defaultChecked={false} onChange={this.onCheckChange} style={{float:'left'}}/>   
				<span className="Select-value-label">
				    {this.props.option.label}	
				</span>
			</div>
		);
	}
}

CountrySelectOption.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired
};


class CountrySelectValue extends React.Component{

    constructor(props) {
        super(props);
    }

	render() {
		/*let gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};*/
		return (
			<div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					{this.props.value}
					{this.props.children}
				</span>
			</div>
		);
	}
}

CountrySelectValue.propTypes = {
    children: PropTypes.node,
    placeholder: PropTypes.string,
    value: PropTypes.object
};


/*
const CountrySelectOption = createClass({
	propTypes: {
		children: PropTypes.node,
		className: PropTypes.string,
		isDisabled: PropTypes.bool,
		isFocused: PropTypes.bool,
		isSelected: PropTypes.bool,
		onFocus: PropTypes.func,
		onSelect: PropTypes.func,
		option: PropTypes.object.isRequired,
	},
	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
    onCheckChange : function (value) {
    },
	render () {
		return (
			<div className="Select-value" 
                title={this.props.option.label}
                style={{display: 'block'}}
                onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={this.props.option.title}>
                
                <input type="checkbox" defaultChecked={false} onChange={this.onCheckChange} style={{float:'left'}}/>   
				<span className="Select-value-label">
				    {this.props.option.label}	
				</span>
			</div>
		);
	}
});

*/