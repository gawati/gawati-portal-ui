import React from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';

import {shortTitle, displayDate, cloneObject} from '../utils/generalhelper';
import {convertObjectToEncodedString, convertEncodedStringToObject, setInRoute, editInRoute} from '../utils/routeshelper';
import {documentServer} from '../constants.js';
import {T} from '../utils/i18nhelper';

import DocumentLink from './DocumentLink';
import DivFeed from '../components/DivFeed';

import '../css/ExprAbstract.css';

/**
 * Renders a link to the thumbnail of the document represented by componentLink
 * @param {object} componentLink 
 */
const ThumbnailAbstract = ({abstract, lang}) => {
    let componentLink = abstract.componentLink;
    let componentSrc = componentLink.src;
    let componentValue = componentLink.value;
    let thumbnailFolder = componentSrc.substring(0, componentSrc.lastIndexOf("/"));
    const lastIndex = componentValue.lastIndexOf(".");
    let thumbnailUrl = documentServer() + thumbnailFolder +   "/th_" + componentValue.substring(0, lastIndex) + ".png";
    console.log(" THUMBNAIL_ABSTRACT ", thumbnailUrl);
    return (
      <DocumentLink abstract={abstract} lang={lang}>
        <img src={ thumbnailUrl } alt={componentLink.value} className="docThumb" />
      </DocumentLink>
    );
}


    

/**
 * Renders an exprAbstract item of a document on the server
 * @param {object} abstract 
 */
class ExprAbstract extends React.Component {

/*     constructor(props) {
        super(props);
    } */

    filterLink = (match, pageLang, query) => {
        if (match === undefined || match.params === undefined || ! match.params.q) {
            return setInRoute("filter", {
                from: 1,
                to: 10,
                count: 10,
                lang: pageLang,
                q: convertObjectToEncodedString(
                    query
                )
            });
        } else {
            return editInRoute({q: convertObjectToEncodedString(query)}, match);
        } 
    }
    
    countryFilter = (abstract, q) => {
        q.countries =  [abstract.country.value];
        return q;
    }

    langFilter = (abstract, q) => {
        q.langs = [abstract.language.value];
        return q;
    }

    yearFilter = (abstract, q) => {
        q.years = [moment(abstract.date[1].value, "YYYY-MM-DD").year().toString()];
        return q;
    }

    render() {
        let abstract = this.props.abstract ;
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        var query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        let yearLink = this.filterLink(this.props.match, pageLang, this.yearFilter(abstract, cloneObject(query)));
        let langLink = this.filterLink(this.props.match, pageLang, this.langFilter(abstract, cloneObject(query)));
        let countryLink = this.filterLink(this.props.match, pageLang, this.countryFilter(abstract, cloneObject(query)));

        return (
            <DivFeed key={abstract['expr-iri']}>
                <h2>
                    <DocumentLink abstract={abstract} lang={pageLang}>{shortTitle(abstract.publishedAs)}</DocumentLink>
                </h2>
                <div className="text-block">
                    <NavLink to={ countryLink }> {abstract.country.showAs} </NavLink> &#160;| &#160; 
                    <NavLink to={ langLink }>{abstract.language.showAs}</NavLink> &#160;| &#160;
                    <NavLink to={ yearLink }  key={this.props.lang}>{displayDate(abstract.date[1].value, pageLang)}</NavLink>
                </div>  
                <ThumbnailAbstract abstract={abstract} lang={pageLang}/>
                <p>{abstract.publishedAs}</p>
                <div className="div-block-18 w-clearfix">
                    <DocumentLink abstract={abstract} lang={pageLang}>{T("more...")}</DocumentLink>
                </div>
                <div className="grey-rule"></div>                      
            </DivFeed>
        );
    }
}

export default ExprAbstract;

