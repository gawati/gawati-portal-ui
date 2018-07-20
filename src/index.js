import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import './polyfills';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import  ErrorBoundary from './components/ErrorBoundary.js';
import './i18n';
import {apiUrl} from './api';
import { setupWithConfig, initSSORequired, refreshToken } from './utils/GawatiAuthClient';
import { REFRESH_TOKEN_VALIDITY, REFRESH_TOKEN_INTERVAL } from './constants';

//import './index.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap-overrides.css';
import './css/app-custom.css';
import './css/app-media.css';
import { isAuthEnabled } from './utils/generalhelper';

/**
 * Renders the main Application component
 */
function appRender() {
    ReactDOM.render(
        <BrowserRouter>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </BrowserRouter>,
        document.getElementById('root')
    );
};

/**
 * Invokes the application with authentication
 */
function launchWithAuth ()  {
    setInterval(() => {
        refreshToken(REFRESH_TOKEN_VALIDITY)
        .catch(err => {
            console.log("The authentication session has expired. Please sign-in again.");
            //siteLogout();
            initSSO();
        });
        }, 
        REFRESH_TOKEN_INTERVAL
    );
    initSSO();            
};

/**
 * Initializes the Single Sign on - logs you in if already authenticated in another gawati application
 */
function initSSO(){
    console.log(" calling InitSSO ");
    initSSORequired(
        // onSuccess callback
        (authenticated) => {
            console.log(" SSO Authenticated = ", authenticated);
            appRender();
        },
        // onError callback
        (error) => {
            //alert("There was an error while initializing login", error);
            console.log(" initializing login error ", error);
        }
    );
};

/**
 * Loads the basic data configurations from portal-fe. 
 * gawati.json in portal-fe is a "glue" json that specifices the base URLs of other service components
 * in the gawati application
 * 
 * Only GAWATI_PROXY is required to be set in the portal-ui index.html, since that is required to discover where 
 * gawati.json configuration is. 
 */
function setDataConfigs() {
    return axios.get(apiUrl("gawati"))
        .then( (response) => {
            const {client} = response.data; 
            window.gawati.GAWATI_DOCUMENT_SERVER = client['gawati-media-server'].urlBase;
            window.gawati.GAWATI_PROFILE_SERVER = client['gawati-profiles-ui'].urlBase;
        })
        .catch( (error) => {
            console.log(" Unable to contact front-end services ", error);
        });
};

// entru point function for starting the application
// in development mode we can chose to disable authentication integration
// for testing purposes in configs/dev.json
function startApp() {
    if (!isAuthEnabled()) {
        appRender();
    } else {
        axios.get(apiUrl("keycloak"))
        .then( (response) => {
            try {
                const keycloakConfig = response.data;
                console.log("CALLING setupWithConfig ");
                const isSetup = setupWithConfig(keycloakConfig);
                if (isSetup) {
                    console.log("CALLING launchWithAuth ");
                    launchWithAuth();                
                } else {
                    console.log("CALLING appRender, isSetup false ");
                    console.log(" ERROR: Authentication could not be setup ");
                    appRender();
                }
            } catch (err) {
                console.log("ERROR : Authentication server connect / integration failed: ", err);
                appRender();
            }
        })
        .catch( (error) => {
            console.log(" Unable to load authentication profile on startup ", error, " possibly url is wrong ? ", apiUrl("keycloak"));
            appRender();
        });
    }
}

setDataConfigs()
    .then( (resp) => {
        startApp();
    })
    .catch( (err) => {
        console.log(" SetDataConfigs error ", err);
        startApp();
    });

registerServiceWorker();
