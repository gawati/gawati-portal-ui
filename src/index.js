import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './polyfills';
/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './i18n';
import {setup, initLoginRequired, refreshToken, siteLogout} from './utils/GawatiAuthClient';
import { REFRESH_TOKEN_VALIDITY, REFRESH_TOKEN_INTERVAL } from './constants';

//import './index.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap-overrides.css';
import './css/app-custom.css';
import './css/app-media.css';

setup().then(() => {

    setInterval(() => {
        refreshToken(REFRESH_TOKEN_VALIDITY)
        .catch(err => {
            alert("The authentication session has expired. Please sign-in again.");
            siteLogout();
        });
    }, REFRESH_TOKEN_INTERVAL);

    initLoginRequired(
        () => {
            ReactDOM.render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>,
                document.getElementById('root')
            );
        },
        (error) => {
            console.log("ERROR initLoginRequired ", "Error while logging in" );
            alert("There was an error while initializing login");
        }
    );
}).catch((e) => {
    console.log(e);
    alert("There was an error while setting up authentication");
});

registerServiceWorker();
