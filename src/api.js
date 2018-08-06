import querystring from 'querystring';
import {dataProxyServer} from './constants';
import apis from "./configs/api.json";

/**
 * Use `data` for data APIs
 * Use `local` for file requests on the same current domain
 */
const __GAWATI_APIS = apis.apis;

/**
 * Get the data apis
 */
const getDataApis = () => 
    __GAWATI_APIS.filter( (item) => item.name === "data" )[0];

/**
 * Get the local apis
 */
const getLocalApis = () => 
    __GAWATI_APIS.filter( (item) => item.name === "local" )[0];


/**
 * Use this for Data APIs
 * @param {*} apiName 
 */
export function apiUrl(apiName) {
    const dataApis = getDataApis().apis;
    if (dataApis.hasOwnProperty(apiName)) {
        return dataProxyServer() +  dataApis[apiName] ;
    } else {
        console.log(" Unknown Data API call ", apiName);
        return false;
    }
};

/**
 * Use this for local file Requests on the current domain
 * @param {*} apiName 
 */
export function apiLocalUrl(apiName) {
    const localApis = getLocalApis().apis;
    if (localApis.hasOwnProperty(apiName)) {
        return localApis[apiName] ;
    } else {
        console.log(" Unknown Local API call ", apiName);
        return false;
    }
};

/**
 * Just a more standardized wrapper on apiLocalUrl
 * @param {*} apiName 
 */
export const apiLocalGetCall = (apiName) => 
    apiLocalUrl(apiName) ;

/**
 * Use this for Data APIs
 * @param {*} apiName 
 * @param {*} objParams 
 */
export function apiGetCall(apiName, objParams) {
    let apiPath = apiUrl(apiName) ;
    if (apiPath !== false) {
        if (Object.keys(objParams).length === 0 && objParams.constructor === Object) {
            return apiPath;
        } else {
            let apiParams =  querystring.stringify(objParams);
            return apiPath + "?" + apiParams;
        }
    }
};

