import React from 'react';
import { NavLink } from 'react-router-dom';
import {Version} from '../utils/versionhelper';
import mainLogo from '../images/logo.png';
import mobileButton from '../images/th-menu.png';

import SiteSearchAutoComplete from '../containers/SiteSearchAutoComplete';


const Logo = () =>
    <NavLink className="nav-brand" to="/">
    <img alt="AIF" src={mainLogo} width="75"/>
    </NavLink>
    ;

const SiteHeading = () =>
    <div className="logotype">
        <h1>African Law Library</h1>
        <h2>innovative access to law</h2>
    </div>
    ;


const SearchBox = () =>
    <div className={ `search-form-container col-6` }>
        <form className="search-form" data-name="Email Form" id="email-form" name="email-form">
            <div className="div-block w-clearfix">
               <SiteSearchAutoComplete  /> 
            </div>
        </form>
    </div>
    ;

class TopBar extends React.Component {
        
            constructor(props) {
                super(props);
            }
        
            render() {
            return (
                <header className="navigation-bar">
                    <Version />
                    <div className="container">
                        <Logo />
                        <SiteHeading />
                        <div className="mobile-button">
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