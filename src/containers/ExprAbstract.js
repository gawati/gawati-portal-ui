import React from 'react';
import DivFeed from '../components/DivFeed';
import {shortTitle} from '../utils/GeneralHelper';
import {documentServer} from '../constants.js';
import '../css/ExprAbstract.css';

/**
 * Renders a link to the thumbnail of the document represented by componentLink
 * @param {object} componentLink 
 */
const ThumbnailAbstract = ({componentLink}) => {
    let componentSrc = componentLink.src;
    let componentValue = componentLink.value;
    let thumbnailFolder = componentSrc.substring(0, componentSrc.lastIndexOf("/"));
    let thumbnailUrl = documentServer() + thumbnailFolder +   "/th_" + componentValue.replace(".pdf", ".png");
    return (
        <img src={ thumbnailUrl } alt={componentLink.value} className="docThumb" />
    );
}

/**
 * Renders an exprAbstract item of a document on the server
 * @param {object} abstract 
 */
const ExprAbstract = ({abstract}) => (
        <DivFeed key={abstract['expr-iri']}>
            <h2>{shortTitle(abstract.publishedAs)}</h2>
            <div className="text-block">
                <a href="#"> {abstract.country.showAs} </a> &#160;| &#160; 
                <a href="#">{abstract.language.showAs}</a> &#160;| &#160;
                <a href="#">{abstract.date[1].value} </a>
            </div>  
            <ThumbnailAbstract componentLink={abstract.componentLink} />
            <p>{abstract.publishedAs}</p>
            <div className="div-block-18 w-clearfix">
                <a className="more-button" href="{$o('e-url')}">more...</a>
            </div>
            <div className="grey-rule"></div>                      
        </DivFeed>
);

export default ExprAbstract;

