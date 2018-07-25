import React from 'react';
import {NavLink} from 'react-router-dom';

import { defaultLang } from '../utils/generalhelper';
import {T} from '../utils/i18nhelper';

import imgFace from '../images/face.svg';
// import imgLinkedin from '../images/linkedin.svg';
import imgTwitter from '../images/twitter.svg';
import imgInstagram from '../images/instagram.svg';
import '../css/Footer.css';
import footerLinks from '../configs/footerLinks.json';

const ContentLink = ({lang, page, children}) =>
    <NavLink to={ `/_lang/${lang}/content/_page/${page}` }>{children}</NavLink>;

function Footer({match, i18n}) {
    let lang = match.params.lang || defaultLang().langUI ;
    return (
    <footer>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                    <ul>
                        {
                        footerLinks.column1.map((link) => 
                            <li key={link.label}>
                                <ContentLink lang={lang} page={link.label}>{T(link.label)}</ContentLink>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                    <ul>
                    {
                        footerLinks.column2.map((link) => 
                            link.href? 
                            (<li key={link.label}>
                                <a href={link.href}>{T(link.label)}</a>
                            </li> 
                            )
                            :
                            (<li key={link.label}>
                                <ContentLink lang={lang} page={link.label}>{T(link.label)}</ContentLink>
                            </li>)
                        )}
                    </ul>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <p>{T("Join over 14,000 people")}</p>
                    <div className="w-form">
                        <form className="w-clearfix" data-name="Email Form 2" id="email-form-2"
                            name="email-form-2">
                            <input className="newsletter-form" data-name="Email" id="email" maxLength="256"
                                name="email" placeholder={T("Enter your email address")} required="required"
                                type="email"/>
                            <input className="submit-newsletter" data-wait="Please wait..." type="submit"
                                value=">"/>
                        </form>
                        <div className="form-done">
                            <div>{T("submission received")}</div>
                        </div>
                        <div className="form-fail">
                            <div>{T("wrong while submitting")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="social-icons">
            <h6 className="powered-by">{T("Powered by")}&nbsp;</h6><div className="logo-img"/>
            <h5>{T("The African Law Library")}</h5>
            <div className="social-link-group">
                <a
                    className="social-icon-link"
                    href="https://www.facebook.com/AfricanInnovationFoundation/"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    <img alt="facebook" src={imgFace} width="25"/>
                </a>
                <a
                    className="social-icon-link"
                    href="https://www.instagram.com/africaninnovation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img alt="instagram" src={imgInstagram} width="25"/>
                </a>
                <a
                    className="social-icon-link"
                    href="https://twitter.com/afrinnovfdn?lang=en"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    <img alt="twitter" src={imgTwitter} width="25"/>
                </a>
                {/*<a className="social-icon-link" href="/">
                    <img alt="linkedin" src={imgLinkedin} width="25"/>
                </a>*/}
            </div>
        </div>
    </footer>
    );
}

export default Footer;