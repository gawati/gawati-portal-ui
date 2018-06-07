import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import {versionInfo} from '../utils/versionhelper';
import {T} from '../utils/i18nhelper';
import { Aux, defaultLang, isAuthEnabled } from '../utils/generalhelper';
import SiteSearchAutoComplete from '../containers/SiteSearchAutoComplete';
import LanguageSwitcher from '../containers/LanguageSwitcher';
import {apiGetCall} from '../api.js';

import mobileButton from '../images/th-menu.png';
import NotifBar from './NotifBar';
import DivRow from './DivRow';
import '../css/TopBar.css';
import { siteLogin, siteLogout, siteRegister, getUserInfo, getToken } from '../utils/GawatiAuthClient';

const Logo = () =>
    <Aux>
        <NavLink className="nav-brand" to="/">
            <div className="logo-img"/>
            <SiteHeading />
        </NavLink>
        {/* <h2>{ T("custom:innovative access to law") }</h2> */}
    </Aux>
    ;

const SiteHeading = () =>
    <div className="logotype">
        <h1>{ T("african law library")}</h1>
        <h2>{ T("custom:innovative access to law") }</h2>
    </div>
    ;

const TopBarUpper = ({i18n, match}) => {
        return (
            <div className="row lang-switcher-wrapper">
                <div className="col-12">
                    <div style={ {"width":"50%:", "textAlign": "right"} }>
                    <LanguageSwitcher i18n={i18n} match={match} />
                    </div>
                </div>
            </div>
        );
};
    ;

const SearchBox = (obj) =>
    <div className={ `${obj.cName2}` }>
        <form className="search-form" data-name="Email Form" id="email-form" name="email-form">
            <div className="div-block w-clearfix">
               <SiteSearchAutoComplete  lang={obj.lang}/> 
            </div>
        </form>
    </div>
    ;

class TopBar extends React.Component {
    state = { username: 'guest', authenticated: 'false', profile: ''}

    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); };

    toggleDropDown = ()=>{
	    document.getElementById("myDropdown").classList.toggle("show");
	};

    login = () => {
        siteLogin();
    };

    logout = () => {
        siteLogout();
        // is the below neccessary
        let lang = this.props.match.params.lang || defaultLang().langUI ;
        this.props.history.push('/_lang/'+lang);
    };

    register = () => {
        siteRegister();
    };

    getParameterByName = (variable, url)=>{
       var query = window.location.href;
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] === variable){return pair[1];}
       }
       return(false);
    }

    updateState = (username) =>{
        //this.setState({ authenticated: authenticated});
        this.setState({ username: username});
    }


    componentDidMount = () => {
        if (isAuthEnabled()) {
            if (getToken() != null) {
                // using getToken() here because there is no clear isLoggedIn() APi in keycloak
                // calling getUserInfo() is an option which makes an Ajax request, and an error return
                // (ajax resposne 401 forbidden ) indicates a user who is not logged in. 
                // however, just checking if a token is set seems to provide the same outcome without the 
                // overhead of the ajax request, so using getToken() here. 
                getUserInfo()
                .success( (data) => {
                    console.log(" getUserName (data) = ", data);
                    this.setState({username: data.preferred_username});
                    let apiGawati = apiGetCall(
                        'gawati',
                        {}
                    );
                    axios.get(apiGawati)
                        .then(response => {
                            this.setState({profile: response.data["gawati-profiles-ui"].urlBase});
                        })
                        .catch(function(error) {
                            console.log("error in getDocument()", error);
                        });
                })
                .error( (err) => {
                    this.setState({username: "guest"});
                    console.log(" getUserName (err) = ", err);
                });
            }
        }
    };

    renderLoggedin =  (lang, userName, profile) => {
        if (userName === "guest") {
            return (
            <div className="inline-elements">
                <div className="click" onClick={ this.login }>
                    {T("Sign in")} 
                </div>
                <span className="or">&nbsp;&nbsp;{T("or")}&nbsp;&nbsp;</span>
                <div className="click" onClick={ this.register}> 
                    {T("Sign up")}
                </div>
            </div> 
            );
        } else {
            return (
            <div className="dropdown">
                <div onClick={this.toggleDropDown} className="dropbtn">
                    <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                </div>
                <div id="myDropdown" className="dropdown-content">
                    <NavLink to={profile} target="_blank" className={ `btn btn-link loggedIn` }>Logged in as <b>{userName}</b></NavLink>
                    <button className={ `btn btn-link` }  onClick={this.logout}>
                        Sign out
                    </button>
                </div>
            </div> 
            );   
        }
    };


    render() {
        let lang = this.props.match.params.lang || defaultLang().langUI ;
        const {username, profile} = this.state ;
        const theme = process.env.REACT_APP_THEME;
        let cName = "col-lg-11 offset-lg-2", cName2 = "col-11", cName3 = "col-3";
        if (theme === "ke" || theme === "default") {
            cName = "col-lg-7";
            cName2 = "col-8 offset-lg-1";
            cName3 = "col-3";
        }
    	return (
            <header className="navigation-bar">
                
                <div className="version-info">{
                    T("version") + " = " + versionInfo().version
                }
                </div>
                <Logo />
                
                <div className="container-fluid second-header-row">
                    
                    <SiteHeading />
                    <div className="mobile-button" onClick={this.props.slideToggle}>
                        <img alt="menu" src={mobileButton}  />
                    </div>
                    <div className={`search-form-container ${cName} col-md-12 col-sm-12 col-xs-12`}>
                    <DivRow>
                        <SearchBox lang={ this.props.match.params.lang } cName2={ cName2 }></SearchBox>
                        <div className={`side-col ${cName3}`}>
                            <div className="row">
                                <NotifBar />
                                <div className="login col-sm-9 col-lg-8 col-md-8">
                                    {
                                        this.renderLoggedin(lang, username, profile)
                                    }
                                </div>
                            </div>
                        </div>
                    </DivRow>
                    </div>
                </div>
                <TopBarUpper i18n={ this.props.i18n } match={ this.props.match } />
                <div className="w-nav-overlay" data-wf-ignore=""/>
            </header>
        
        );
    }
}

export default TopBar;
