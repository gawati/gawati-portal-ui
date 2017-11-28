import React from 'react';
import { NavLink } from 'react-router-dom';
import {Aux, getDocType, getLangCodeAlpha3b} from '../utils/GeneralHelper';
import {anPublication, anFRBRcountry, anExprFRBRdate, anFRBRlanguage, anFRBRnumber} from '../utils/AkomaNtoso';
import moment from 'moment';

const CategoryLink = ({type}) => 
    <NavLink to="/">{ getDocType(type)['category']}</NavLink>;

const HomeLink = () => 
    <NavLink to="/">Home</NavLink>;

const CountryLink = ({doc, type}) =>
    <NavLink to="/">{ anFRBRcountry(doc, type)['showAs'] }</NavLink>

const LanguageLink = ({doc, type}) => {
    let langObj =  getLangCodeAlpha3b(anFRBRlanguage(doc, type)['language']) ;
    if (langObj !== undefined) {
        let langEng = Array.isArray(langObj.desc) ? 
            langObj.desc.find(obj => obj.lang === 'eng' )['content'] :
            langObj.desc.content;
        return (
            <NavLink to="/">{langEng}</NavLink>
        );
    } else {
        return (
            <NavLink to="/">Undefined</NavLink>
        );
    }
}
 
const DocumentDate = ({doc, type}) =>
     <Aux>{moment(anExprFRBRdate(doc, type).date).format('MMMM D YYYY')}</Aux> ;

const DocumentNumber = ({doc, type}) =>
     <Aux>{anFRBRnumber(doc, type)['showAs']}</Aux> ;     

const DocumentNavBlock = ({doc, type}) => 
    <div className="text-block">
            <CountryLink doc={doc} type={type} /> &#160;| &#160; <CategoryLink type={type} /> &#160;|
            &#160; <DocumentDate doc={doc} type={type} /> &#160;| &#160; <LanguageLink doc={doc} type={type} /> &#160;| &#160;
            <DocumentNumber doc={doc} type={type} /> 
    </div>;


export default DocumentNavBlock;
