import {documentTypes} from '../constants';
import docTypes from '../configs/docTypes.json';
import languageCodes from '../configs/languageCodes.json';
import moment from 'moment';

export const Aux = props => props.children;

export const stringCut = (i, text) => {
    var short = text.substr(0, i);
    if (/^\S/.test(text.substr(i)))
        return short.replace(/\s+\S*$/, "");
    return short;
};

export const shortTitle = (theTitle) => {
    if (theTitle.length <= 80) {
        return theTitle;
    } else {
        return stringCut(80, theTitle) + "...";
    }
};


export const prefixIri = (iri) => 
     iri.startsWith('/') ? iri : "/" + iri;

export const getDocumentType = (doc) => Object.keys(doc.akomaNtoso)[0] ;

export const isEmpty =  (obj) => 
    Object.keys(obj).length === 0 && obj.constructor === Object ;

export const getDocTypes = () => docTypes.docTypes ;

export const getDocType = (findType) => getDocTypes().find(dType => dType['akn-type'] === findType) ;

export const getLangCodeAlpha3b = (alpha3b) => languageCodes.langs.lang.find(lingo => lingo['alpha3b'] === alpha3b ) ;

export const displayDate = (date) => moment(date).format('MMMM D YYYY') ;

export const range = ((n) => [...Array(n).keys()] ) ;

export const rangeMinMax = ((min, max , step = 1) => {
    // return a array from min to max, inclusive, in steps of step.
    // if step is not integer, then max may not be included
    // http://xahlee.info/js/javascript_range_array.html
    // version 2017-04-20
    const arr = [];
    const totalSteps = Math.floor((max - min)/step);
    for (let ii = 0; ii <= totalSteps; ii++ ) { arr.push(ii * step + min) }
    return arr;
} );

export const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};    

export const insertIntoArray = (arr, value) => {
        return arr.reduce((result, element, index, array) => {
            result.push(element);
            if (index < array.length - 1) {
                result.push(value);
            }
            return result;
        }, []);
    };