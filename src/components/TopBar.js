import React from 'react';
import mainLogo from '../images/logo.png';
import mobileButton from '../images/th-menu.png';

function TopBar() {
    return (
        <header className="navigation-bar">

            <div className="container">
                <a className="nav-brand" href="/">
                    <img alt="AIF" src={mainLogo} width="75"/>
                </a>
                <div className="logotype">
                    <h1>African Law Library</h1>
                    <h2>innovative access to law</h2>
                </div>
                <div className="mobile-button">
                    <img alt="menu" src={mobileButton} />
                </div>

                <div className={ `search-form-container col-6` }>
                    <form className="search-form" data-name="Email Form" id="email-form" name="email-form">
                        <div className="div-block w-clearfix">
                            <input className="text-field-2" data-name="Name" id="search" maxLength="256"
                                name="name" placeholder="Search " type="text"/>
                            <input className={ `submit-button w-button` } data-wait="Please wait..." type="submit"
                                value="GO"/>
                        </div>
                    </form>
                </div>
            </div>

            <div className="w-nav-overlay" data-wf-ignore=""/>
        </header>
   
    );
}

export default TopBar;