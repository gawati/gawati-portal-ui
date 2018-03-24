import React from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';

import {shortTitle, displayDate} from '../utils/generalhelper';
import {convertObjectToEncodedString, setInRoute} from '../utils/routeshelper';
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
    let thumbnailUrl = documentServer() + thumbnailFolder +   "/th_" + componentValue.replace(".pdf", ".png");
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

    countryLink = (pageLang, abstract, query) =>
        setInRoute(
            "filter", {
                from: 1,
                to: 10,
                count: 10,
                lang: pageLang,
                q: convertObjectToEncodedString(
                    query
                )
            }
        );
    
    langLink = (pageLang, abstract, query) =>
        setInRoute(
            "filter", {
                from: 1,
                to: 10,
                count: 10,
                lang: pageLang,
                q: convertObjectToEncodedString(
                    query
                )
            }
        );

    yearLink = (pageLang, abstract, query) =>
        setInRoute(
            "filter", {
                from: 1,
                to: 10,
                count: 10,
                lang: pageLang,
                q: convertObjectToEncodedString(
                    query
                )
            }
        );


    countryAbstract = (abstract, q) => {
        q.countries =  [abstract.country.value];
        return q;
    }

    langAbstract = (abstract, q) => {
        q.langs = [abstract.language.value];
        return q;
    }

    yearAbstract = (abstract, q) => {
        q.years = [moment(abstract.date[1].value, "YYYY-MM-DD").year()];
        return q;
    }

    render() {
        let abstract = this.props.abstract ;
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        var Yquery = this.props.match === undefined || this.props.match.params.q===undefined ? {} : JSON.parse(decodeURIComponent(this.props.match.params.q));
        var Lquery = this.props.match === undefined || this.props.match.params.q===undefined ? {} : JSON.parse(decodeURIComponent(this.props.match.params.q));
        var Cquery = this.props.match === undefined || this.props.match.params.q===undefined ? {} : JSON.parse(decodeURIComponent(this.props.match.params.q));

        let yearLink = this.yearLink(pageLang, abstract, this.yearAbstract(abstract, Yquery));
        let langLink = this.langLink(pageLang, abstract, this.langAbstract(abstract, Lquery));
        let countryLink = this.countryLink(pageLang, abstract, this.countryAbstract(abstract, Cquery));

        return (
            <DivFeed key={abstract['expr-iri']}>
                <h2>
                    <DocumentLink abstract={abstract} lang={pageLang}>{shortTitle(abstract.publishedAs)}</DocumentLink>
                </h2>
                <div className="text-block">
                    <NavLink to={ countryLink }> {T(abstract.country.showAs)} </NavLink> &#160;| &#160; 
                    <NavLink to={ langLink }>{T(abstract.language.showAs)}</NavLink> &#160;| &#160;
                    <NavLink to={ yearLink }  key={this.props.lang}>{displayDate(abstract.date[1].value, pageLang)}</NavLink>
                </div>  
                <ThumbnailAbstract abstract={abstract} lang={pageLang}/>
                <p>{abstract.publishedAs}</p>
                <div className="div-block-18 w-clearfix">
                    <DocumentLink abstract={abstract} lang={pageLang}>more...</DocumentLink>
                </div>
                <div className="grey-rule"></div>                      
            </DivFeed>
        );
    }
}

export default ExprAbstract;

