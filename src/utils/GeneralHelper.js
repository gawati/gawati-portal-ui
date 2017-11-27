import {documentTypes} from '../constants';
import docTypes from '../configs/docTypes.json';
import languageCodes from '../configs/languageCodes.json';

export const Aux = props => props.children;

export function stringCut(i, text) {
    var short = text.substr(0, i);
    if (/^\S/.test(text.substr(i)))
        return short.replace(/\s+\S*$/, "");
    return short;
}

export function shortTitle(theTitle) {
    if (theTitle.length <= 80) {
        return theTitle;
    } else {
        return stringCut(80, theTitle) + "...";
    }
}

export const prefixIri = (iri) => 
     iri.startsWith('/') ? iri : "/" + iri;

export const getDocumentType = (doc) => Object.keys(doc.akomaNtoso)[0] ;

export const isEmpty =  (obj) => 
    Object.keys(obj).length === 0 && obj.constructor === Object ;

export const getDocTypes = () => docTypes.docTypes ;

export const getDocType = (findType) => getDocTypes().find(dType => dType['akn-type'] === findType) ;

export const getLangCodeAlpha3b = (alpha3b) => languageCodes.langs.lang.find(lingo => lingo['alpha3b'] === alpha3b ) ;