import React from 'react';

import imgFace from '../images/face.svg';
import imgLinkedin from '../images/linkedin.svg';
import imgTwitter from '../images/twitter.svg';
import imgInstagram from '../images/instagram.svg';


function Footer() {
    return (
<footer>
    <div className="container">
        <div className="row">
            <div className="col-4">
                <ul>
                    <li>
                        <a href="javascript:;">Policies</a>
                    </li>
                    <li>
                        <a href="javascript:;">Privacy policy</a>
                    </li>
                    <li>
                        <a href="javascript:;">Copyright</a>
                    </li>
                    <li>
                        <a href="javascript:;">Terms of Service</a>
                    </li>
                </ul>
            </div>

            <div className="col-4">
                <ul>
                    <li>
                        <a href="javascript:;">About Us</a>
                    </li>
                    <li>
                        <a href="javascript:;">Who we are </a>
                    </li>
                    <li>
                        <a href="javascript:;">What we do</a>
                    </li>
                    <li>
                        <a href="javascript:;">FAQ</a>
                    </li>
                    <li>
                        <a href="javascript:;">Blog</a>
                    </li>
                    <li>
                        <a href="javascript:;">Contact Us</a>
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
            <a className="social-icon-link" href="javascript:;">
                <img alt="facebook" src={imgFace} width="25"/>
            </a>
            <a className="social-icon-link" href="javascript:;">
                <img alt="instagram" src={imgInstagram} width="25"/>
            </a>
            <a className="social-icon-link" href="javascript:;">
                <img alt="twitter" src={imgTwitter} width="25"/>
            </a>
            <a className="social-icon-link" href="javascript:;">
                <img alt="linkedin" src={imgLinkedin} width="25"/>
            </a>
        </div>
        <h5>THE AFRICAN LAW LIBRARY</h5>
    </div>

</footer>
        
    )
}

export default Footer;