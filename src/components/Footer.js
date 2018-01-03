import React from 'react';
import {NavLink} from 'react-router-dom';

import { defaultLang } from '../utils/generalhelper';

import imgFace from '../images/face.svg';
import imgLinkedin from '../images/linkedin.svg';
import imgTwitter from '../images/twitter.svg';
import imgInstagram from '../images/instagram.svg';

const ContentLink = ({lang, page, children}) =>
    <NavLink to={ `/content/_lang/${lang}/_page/${page}` }>{children}</NavLink>;

function Footer({match, i18n}) {
    let lang = match.params.lang || defaultLang().langUI ;
    return (
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <ul>
                        <li>
                            <ContentLink lang={lang} page="policies">Policies</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="privacy_policy">Privacy Policy</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="copyright">Copyright</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="terms_of_service">Terms of Service</ContentLink>
                        </li>
                    </ul>
                </div>

                <div className="col-4">
                    <ul>
                        <li>
                            <ContentLink lang={lang} page="terms_of_service">Terms of Service</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="who_we_are">Who We Are</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="what_we_do">What We Do</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="faq">FAQ</ContentLink>
                        </li>
                        <li>
                            <a href="https://www.gawati.org">Blog</a>
                        </li>
                        <li>
                            <a href="/">Contact Us</a>
                        </li>
                    </ul>
                </div>

                <div className="col-4">
                    <p>Join over 14,000 people who receive weekly information</p>
                    <div className="w-form">
                        <form className="w-clearfix" data-name="Email Form 2" id="email-form-2"
                            name="email-form-2">
                            <input className="newsletter-form" data-name="Email" id="email" maxLength="256"
                                name="email" placeholder="Enter your email address" required="required"
                                type="email"/>
                            <input className="submit-newsletter" data-wait="Please wait..." type="submit"
                                value=">"/>
                        </form>
                        <div className="form-done">
                            <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div className="form-fail">
                            <div>Oops! Something went wrong while submitting the form</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="social-icons">
            <div className="social-link-group">
                <a className="social-icon-link" href="/">
                    <img alt="facebook" src={imgFace} width="25"/>
                </a>
                <a className="social-icon-link" href="/">
                    <img alt="instagram" src={imgInstagram} width="25"/>
                </a>
                <a className="social-icon-link" href="/">
                    <img alt="twitter" src={imgTwitter} width="25"/>
                </a>
                <a className="social-icon-link" href="/">
                    <img alt="linkedin" src={imgLinkedin} width="25"/>
                </a>
            </div>
            <h5>THE AFRICAN LAW LIBRARY</h5>
        </div>
    </footer>
    );
}

export default Footer;