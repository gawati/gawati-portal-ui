import React from 'react';
import PropTypes from 'prop-types';
import {groupBy, filter, indexOf} from 'lodash';
import Select from 'react-select';
import {NavLink} from 'react-router-dom';
import { getLangs } from "../utils/i18nhelper";
import { editInRoute } from "../utils/routeshelper";
import '../css/LanguageSwitcher.css';
import 'react-select/dist/react-select.css';

class LanguageSwitcher extends React.Component {
    
    constructor (props, context) {
        super(props);
        if ( (props.i18n.language !== props.match.params.lang) && (props.match.params.lang) ) {
            props.i18n.changeLanguage(props.match.params.lang);
        }
        const langs = getLangs();
        const grouped = groupBy(langs, 'origin');
        this.groupedArr = Object.values(grouped);
        this._defaultSelected = filter(langs, { 'lang': props.i18n.language });
    }
    

    onLangChange = (selected) => {
        var newRoute = editInRoute({lang:selected.lang}, this.props.match);
        const { router } = this.context;
        router.history.push(newRoute);
    }

    render () {
        return (
            <ul className="list-inline"> 
            {
                this.groupedArr.map(
                    group => 
                        (group.length > 1)  ?
                        <Select options={group} 
                            onChange={this.onLangChange} 
                            value={indexOf(group, this._defaultSelected[0]) > -1 ? this._defaultSelected[0] : group[0]} 
                            placeholder="Select an option" 
                            key={`ui-lang-${group[0].origin}`}
                            valueKey='lang'
                            labelKey='content'
                            />                      
                        :
                        <li key={ `ui-lang-${group[0].lang}`} 
                            className={ `list-inline-item ui-lang-item ${ group[0].lang === this.props.i18n.language ? "ui-lang-highlight": "" }`}>
                            <NavLink to={ editInRoute({lang:group[0].lang}, this.props.match) }>{group[0].content}</NavLink>
                        </li>
                ) 
            }
            </ul>
        ); 
    }
    
}
;

LanguageSwitcher.contextTypes = {
    router: PropTypes.object
}

export default LanguageSwitcher;
