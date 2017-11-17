import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Footer() {
    return (
<footer>
    <div class="container">
        <div class="row">
            <div class="col-4">
                <ul>
                    <li>
                        <a href="">Policies</a>
                    </li>
                    <li>
                        <a href="">Privacy policy</a>
                    </li>
                    <li>
                        <a href="">Copyright</a>
                    </li>
                    <li>
                        <a href="">Terms of Service</a>
                    </li>
                </ul>
            </div>

            <div class="col-4">
                <ul>
                    <li>
                        <a href="">About Us</a>
                    </li>
                    <li>
                        <a href="">Who we are </a>
                    </li>
                    <li>
                        <a href="">What we do</a>
                    </li>
                    <li>
                        <a href="">FAQ</a>
                    </li>
                    <li>
                        <a href="">Blog</a>
                    </li>
                    <li>
                        <a href="">Contact Us</a>
                    </li>
                </ul>
            </div>

            <div class="col-4">
                <p>Join over 14,000 people who receive weekly information</p>
                <div class="w-form">
                    <form class="w-clearfix" data-name="Email Form 2" id="email-form-2"
                        name="email-form-2">
                        <input class="newsletter-form" data-name="Email" id="email" maxlength="256"
                            name="email" placeholder="Enter your email address" required="required"
                            type="email"/>
                        <input class="submit-newsletter" data-wait="Please wait..." type="submit"
                            value=">"/>
                    </form>
                    <div class="form-done">
                        <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div class="form-fail">
                        <div>Oops! Something went wrong while submitting the form</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="social-icons">
        <div class="social-link-group">
            <a class="social-icon-link" href="#">
                <img src="images/face.svg" width="25"/>
            </a>
            <a class="social-icon-link" href="#">
                <img src="images/instagram.svg" width="25"/>
            </a>
            <a class="social-icon-link" href="#">
                <img src="images/twitter.svg" width="25"/>
            </a>
            <a class="social-icon-link" href="#">
                <img src="images/linkedin.svg" width="25"/>
            </a>
        </div>
        <h5>THE AFRICAN LAW LIBRARY</h5>
    </div>

</footer>
        
    )
}

export default Footer;