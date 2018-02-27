import React from 'react';
import { NavLink } from 'react-router-dom';
import {versionInfo} from '../utils/versionhelper';
import {T} from '../utils/i18nhelper';
import SiteSearchAutoComplete from '../containers/SiteSearchAutoComplete';
import LanguageSwitcher from '../containers/LanguageSwitcher';

import mobileButton from '../images/th-menu.png';
import NotifBar from './NotifBar';
import DivRow from './DivRow';
import '../css/TopBar.css';
import Keycloak from 'keycloak-js';
import keycloakJson from '../configs/keycloak.json';

const kc = Keycloak(keycloakJson);


const Logo = () =>
    <NavLink className="nav-brand" to="/">
        <div className="logo-img"/>
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
                <div style={ {"float":"left","textAlign": "left", "width":"50%", "marginLeft":"40px", "color": "red"} }>{
                    T("version") + " = " + versionInfo().version
                }
                </div>
                <div style={ {"width":"50%:", "textAlign": "right", "marginRight":"40px", "paddingBottom":"10px"} }>
                <LanguageSwitcher i18n={i18n} match={match} />
                </div>
            </div>
        );
};
    ;

const SearchBox = () =>
    <div className={ `col ` }>
        <form className="search-form" data-name="Email Form" id="email-form" name="email-form">
            <div className="div-block w-clearfix">
               <SiteSearchAutoComplete  /> 
            </div>
        </form>
    </div>
    ;

class TopBar extends React.Component {
    login = () => {
        kc.login();
    }

    logout = () => {
        kc.logout();
    }

    getParameterByName = (variable, url)=>{
       var query = window.location.href;
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] === variable){return pair[1];}
       }
       return(false);
    }

    checkLogin = () =>{
        kc.init().success(function(authenticated) {
            if(authenticated){
                localStorage.setItem('authenticated', 'true');
                window.location.reload();
            }else{
                localStorage.setItem('authenticated', 'false');
            }
        }).error(function(error) {
            alert('failed to initialize'+error);
        });
    }
    componentDidMount() {
        this.checkLogin();
    }
    render() {
        return (
            <header className="navigation-bar">
                <div class="row col-12">
                <TopBarUpper i18n={ this.props.i18n } match={ this.props.match } />
                <div class="login col-2">{localStorage.getItem('authenticated')==='true' ? <div onClick={ this.logout}>Logout</div> : <div onClick={ this.login}>Login</div> }</div>
                </div>
                <div className="container-fluid">
                    <Logo />
                    <SiteHeading />
                    <div className="mobile-button" onClick={this.props.slideToggle}>
                        <img alt="menu" src={mobileButton} />
                    </div>
                    <div className="search-form-container col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <DivRow>
                        <SearchBox />
                        <NotifBar />
                    </DivRow>
                    </div>
                </div>
                <div className="w-nav-overlay" data-wf-ignore=""/>
            </header>
        
        );
    }
}

export default TopBar;