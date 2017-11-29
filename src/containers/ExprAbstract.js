import React from 'react';
import {Link} from 'react-router-dom';

import DivFeed from '../components/DivFeed';
import {shortTitle, displayDate} from '../utils/GeneralHelper';
import {documentServer} from '../constants.js';
import '../css/ExprAbstract.css';

/**
 * Renders a link to the thumbnail of the document represented by componentLink
 * @param {object} componentLink 
 */
const ThumbnailAbstract = ({abstract}) => {
    let componentLink = abstract.componentLink;
    let componentSrc = componentLink.src;
    let componentValue = componentLink.value;
    let thumbnailFolder = componentSrc.substring(0, componentSrc.lastIndexOf("/"));
    let thumbnailUrl = documentServer() + thumbnailFolder +   "/th_" + componentValue.replace(".pdf", ".png");
    return (
      <DocumentLink abstract={abstract} >
        <img src={ thumbnailUrl } alt={componentLink.value} className="docThumb" />
      </DocumentLink>
    );
}


const DocumentLink = ({abstract, children}) => {
    return (
        <Link to={'/doc/_lang/en/_iri' + abstract['expr-iri']}>{children}</Link>
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
                <a href="#">{displayDate(abstract.date[1].value)} </a>
            </div>  
            <ThumbnailAbstract abstract={abstract} />
            <p>{abstract.publishedAs}</p>
            <div className="div-block-18 w-clearfix">
                <DocumentLink abstract={abstract}>more...</DocumentLink>
            </div>
            <div className="grey-rule"></div>                      
        </DivFeed>
);

export default ExprAbstract;

