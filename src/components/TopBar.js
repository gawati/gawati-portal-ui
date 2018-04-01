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

import GawatiAuthHelper from '../utils/GawatiAuthHelper';


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
                <div style={ {"width":"50%:", "textAlign": "right", "marginRight":"40px", "paddingBottom":"10px"} }>
                <LanguageSwitcher i18n={i18n} match={match} />
                </div>
            </div>
        );
};
    ;

const SearchBox = (lang) =>
    <div className={ `col ` }>
        <form className="search-form" data-name="Email Form" id="email-form" name="email-form">
            <div className="div-block w-clearfix">
               <SiteSearchAutoComplete  lang={lang}/> 
            </div>
        </form>
    </div>
    ;

class TopBar extends React.Component {
    state = { username: 'guest', authenticated: 'false'}
    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }
    login = () => {
        GawatiAuthHelper.login();
    }

    toggleDropDown = ()=>{
	    document.getElementById("myDropdown").classList.toggle("show");
	}

    logout = () => {
        GawatiAuthHelper.logout();
    }

    register = () => {
        GawatiAuthHelper.register();
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

    updateState = (authenticated, username) =>{
        this.setState({ authenticated: authenticated});
        this.setState({ username: username});
    }

    checkLogin = () =>{
        if(GawatiAuthHelper.isUserLoggedIn()){
            this.updateState('true', GawatiAuthHelper.getUserName());
        }else{
            const me = this;
            GawatiAuthHelper.save(function(response){
                var auth = GawatiAuthHelper.isUserLoggedIn() ? 'true' : 'false';
                me.updateState(auth, GawatiAuthHelper.getUserName());
            });
        }
    }
    componentDidMount() {
        this.checkLogin();
    }

    render() {
    	return (
            <header className="navigation-bar">
                <div className="version-info">{
                    T("version") + " = " + versionInfo().version
                }
                </div>
                <div>
                <TopBarUpper i18n={ this.props.i18n } match={ this.props.match } />
                </div>
                <div className="container-fluid">
                    <Logo />
                    <SiteHeading />
                    <div className="mobile-button" onClick={this.props.slideToggle}>
                        <img alt="menu" src={mobileButton}  />
                    </div>
                    <div className="search-form-container col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <DivRow>
                        <SearchBox lang={ this.props.match.params.lang }></SearchBox>
                        <NotifBar />
                        <div className="login col-3">
                            {
                            this.state.authenticated==='true' ? 
                            <div className="dropdown">
                                <div onClick={this.toggleDropDown} className="dropbtn">
                                    <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                                </div>
                                <div id="myDropdown" className="dropdown-content">
                                    <button className={ `btn btn-link loggedIn` }>
                                        <NavLink to="/profile">Logged in as <b>{this.state.username}</b></NavLink>
                                    </button>
                                    <button className={ `btn btn-link` }  onClick={this.logout}>
                                        Sign out
                                    </button>
                                </div>
                            </div> : 
                            <div className="inline-elements">
                                <div className="click" onClick={ this.login }>
                                    {T("Sign in")} 
                                </div>
                                <span className="or">&nbsp;&nbsp;{T("or")}&nbsp;&nbsp;</span>
                                <div className="click" onClick={ this.register}> 
                                    {T("Sign up")}
                                </div>
                            </div> 
                            }
                        </div>
                    </DivRow>
                    </div>
                </div>
                <div className="w-nav-overlay" data-wf-ignore=""/>
            </header>
        
        );
    }
}

export default TopBar;
