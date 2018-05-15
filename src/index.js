import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import './polyfills';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './i18n';
import {apiLocalUrl} from './api';
import { setupWithConfig, initSSORequired, refreshToken, siteLogout } from './utils/GawatiAuthClient';
import { REFRESH_TOKEN_VALIDITY, REFRESH_TOKEN_INTERVAL } from './constants';

//import './index.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap-overrides.css';
import './css/app-custom.css';
import './css/app-media.css';

axios.get(apiLocalUrl("keycloak"))
    .then( (response) => {
        const keycloakConfig = response.data;
        const isSetup = setupWithConfig(keycloakConfig);
        if (isSetup) {
            
            setInterval(() => {
                refreshToken(REFRESH_TOKEN_VALIDITY)
                .catch(err => {
                    alert("The authentication session has expired. Please sign-in again.");
                    siteLogout();
                });
                }, 
                REFRESH_TOKEN_INTERVAL
            );
            
            console.log(" WINDOW.KEYCLOAK ", window.GAWATI_AUTH);
            initSSORequired(
                // onSuccess callback
                (authenticated) => {
                    console.log(" SSO Authenticated = ", authenticated);
                    ReactDOM.render(
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>,
                        document.getElementById('root')
                    );
                },
                // onError callback
                (error) => {
                    alert("There was an error while initializing login", error);
                    console.log(" initializing login error ", error);
                }
            );            
        }
    })
    .catch( (error) => {
        console.log(" Unable to load authentication profile on startup ", error, " possibly url is wrong ? ", apiLocalUrl("keycloak"));
    });

    registerServiceWorker();
