import querystring from 'querystring';
import {dataProxyServer} from './constants';

const GAWATI_APIS = {
    base_iri : '/gw/service',
    apis : {
        'doc': '/doc/',
        'doc-xml': '/doc/xml/',
        'keyword': '/keyword/',
        'recent-summary' : '/recent/expressions/summary/',
        'search-by-country' : '/search/country/',
        'search-by-language' : '/search/language/',
        'search-by-subject' : '/search/keyword/',
        'search-by-year': '/search/year/',
        'search-grouped': '/searchac/' ,
        'short-filter-cache': '/short-filter-cache/',
        'smart-filter-cache': '/smart-filter-cache/',
        'themes-summary' : '/themes/expressions/summary/'
    }
};

export function apiUrl(apiName) {
    if (GAWATI_APIS.apis.hasOwnProperty(apiName)) {
        return dataProxyServer() + GAWATI_APIS.base_iri + GAWATI_APIS.apis[apiName] ;
    } else {
        console.log(" Unknown API call ", apiName);
        return false;
    }
}

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
}

