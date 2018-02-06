import React from 'react';
import { NavLink } from 'react-router-dom';
import {versionInfo} from '../utils/versionhelper';
import {T} from '../utils/i18nhelper';
import SiteSearchAutoComplete from '../containers/SiteSearchAutoComplete';
import LanguageSwitcher from '../containers/LanguageSwitcher';

import mainLogo from '../images/logo.png';
import mobileButton from '../images/th-menu.png';


const Logo = () =>
    <NavLink className="nav-brand" to="/">
        <img alt="AIF" src={mainLogo} width="75"/>
    </NavLink>
    ;

const SiteHeading = () =>
    <div className="logotype">
        <h1>{ T("african law library")}</h1>
        <h2>{ T("innovative access to law") }</h2>
    </div>
    ;

const TopBarUpper = ({i18n, match}) => {
        return (
            <div className="col-12">
                <div style={ {"float":"left","textAlign": "left", "width":"50%", "marginLeft":"40px", "paddingBottom":"20px", "color": "red"} }>{
                    T("version") + " = " + versionInfo().version
                }
                </div>
                <div style={ {"width":"50%:", "textAlign": "right", "marginRight":"40px", "paddingBottom":"20px"} }>
                <LanguageSwitcher i18n={i18n} match={match} />
                </div>
            </div>
        );
};
    ;

const SearchBox = () =>
    <div className={ `search-form-container col-lg-6 col-md-12 col-sm-12 col-xs-12` }>
        <form className="search-form" data-name="Email Form" id="email-form" name="email-form">
            <div className="div-block w-clearfix">
               <SiteSearchAutoComplete  /> 
            </div>
        </form>
    </div>
    ;

class TopBar extends React.Component {
    render() {
        return (
            <header className="navigation-bar">
                <TopBarUpper i18n={ this.props.i18n } match={ this.props.match } />
                <div className="container-fluid">
                    <Logo />
                    <SiteHeading />
                    <div className="mobile-button" onClick={this.props.slideToggle}>
                        <img alt="menu" src={mobileButton} />
                    </div>
                    <SearchBox />
                </div>
                <div className="w-nav-overlay" data-wf-ignore=""/>
            </header>
        
        );
    }
}

export default TopBar;