import Keycloak from 'keycloak-js';
import axios from 'axios';
import {apiGetCall} from '../api';

/**
 * Gets the GAWATI_AUTH window object
 */
const getGawatiAuth = () => {
    return window.GAWATI_AUTH ; 
};

/**
 * Sets up the KeyCloak object into the global window object
 * using the KeyCloak json document
 */
export const setup = () => {
  if (window.GAWATI_AUTH === undefined) {
    return axios.get(apiGetCall('keycloak', {})).then(response => {
      window.GAWATI_AUTH = Keycloak(response.data);
    });
  } else {;
    return Promise.resolve(true);
  }
}

/**
 * Initializes the login for the KeyCloak object
 * @param {*} onSuccess success callback
 * @param {*} onError  error callback
 */
export const initLoginRequired = (onSuccess, onError) => {
    getGawatiAuth().init(
        {onLoad: 'login-required'}
    ).success( (authenticated) => {
        if (authenticated) {
            onSuccess();
        }
    }).error( (err) => {
        onError(err);
    });
};

/**
 * Returns the authorization token
 */
export const getToken = () => {
    return getGawatiAuth().token;
};

/**
 * Returns the parsed authorization token
 */
export const getTokenParsed = () => {
    return getGawatiAuth().tokenParsed ; 
}

/**
 * Logs out
 */
export const siteLogout = () => {
    return getGawatiAuth().logout();
};

/**
 * Refreshes the token every ``minValidity`` seconds
 * @param {integer} minValidity in seconds
 */
export const refreshToken = (minValidity = 5) => {
    return new Promise((resolve, reject) => {
        getGawatiAuth().updateToken(minValidity)
            .success(() => resolve())
            .error((err) => reject(err));
    });
};

/**
 * Returns the full name of the current user
 */
export const getUserName = (onSuccess) => {
  return getGawatiAuth().loadUserInfo()
  .success((data) => { onSuccess(data.name) })
  .error((err) => console.log(err));
}

/**
 * Returns the profile of the current user
 */
export const getUserProfile = (onSuccess) => {
  return getGawatiAuth().loadUserProfile()
  .success((data) => { onSuccess(data) })
  .error((err) => console.log(err));
}