import React from 'react';
import { NavLink } from 'react-router-dom';
import {versionInfo} from '../utils/versionhelper';
import {T} from '../utils/i18nhelper';
import SiteSearchAutoComplete from '../containers/SiteSearchAutoComplete';
import LanguageSwitcher from '../containers/LanguageSwitcher';
import NotifBar from './NotifBar';

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
                     " version = " + versionInfo().version
                }
                </div>
                <div style={ {"width":"50%:", "textAlign": "right", "marginRight":"40px"} }>
                <LanguageSwitcher i18n={i18n} match={match} />
                </div>
            </div>
        );
};
    ;

const SearchBox = () =>
    <div className={ `search-form-container col-6` }>
        <div className="row">
        <form className="search-form col-11" data-name="Email Form" id="email-form" name="email-form">
            <div className="div-block w-clearfix">
               <SiteSearchAutoComplete  /> 
            </div>
        </form>
        <div className="col-1">
        <NotifBar/>
        </div>
        </div>
    </div>
    ;

class TopBar extends React.Component {
    render() {
        return (
            <header className="navigation-bar">
                <TopBarUpper i18n={ this.props.i18n } match={ this.props.match } />
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Logo />
                            <SiteHeading />
                            <div className="mobile-button">
                                <img alt="menu" src={mobileButton} />
                            </div>
                        </div>
                        <SearchBox />
                        
                    </div>
                </div>
                <div className="w-nav-overlay" data-wf-ignore=""/>
                
            </header>
        
        );
    }
}

export default TopBar;