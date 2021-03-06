import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DivFeed from '../components/DivFeed';

import {apiGetCall} from '../api';
import { prefixIri, isEmpty, insertIntoArray} from '../utils/generalhelper';
import {T} from '../utils/i18nhelper';
import {anPublication, anFRBRnumber, anTLCConcept, anExprFRBRdate} from '../utils/akomantoso';


import DocumentBreadcrumb from './DocumentBreadcrumb';
import DocumentNavBlock from './DocumentNavBlock';
import DocumentSignature from './DocumentSignature';
import DocumentActions from './DocumentActions';
import DocumentTagCloud from './DocumentTagCloud';
import GawatiViewer from 'gawati-viewer';
import SearchFullText from './SearchFullText';

import DivListing from '../components/DivListing';
import ListingLoading from '../components/ListingLoading';
import {anDocType, anDocTitle, anMeta2, anBody} from '../utils/akomantoso';
import {substringBeforeLastMatch } from '../utils/stringhelper';
import { documentServer } from '../constants';


import 'react-tabs/style/react-tabs.css';
import '../css/react-tabs.css';
import '../css/DocumentTagCloud.css';

const DocumentTitle = ({doc, type}) =>
    <h1>{anPublication(doc, type)['showAs']}</h1>;

/*
const DocumentPartOf = ({doc, type}) => {
    return (
        <div className="part-of"> Part of the <a href="#"> Mixed Market Act 1991</a>. Work <a
        href="#">Search within this Work</a> &#160;| &#160;<a href="#">Timeline of the
        Work</a>
        </div>
    );
}
*/


const getThemes = (doc, type) => {
    let tlcc = anTLCConcept(doc, type);
    if (Array.isArray(tlcc)) {
       let tlccArr = 
        insertIntoArray(
            tlcc.filter(
                concept => concept.href.startsWith('/ontology/Concept')
            ).map(
                concept => <span className="text-span-19" key={concept.eId}>{concept.showAs}</span>
            ),
            ' \u00B7 '
        );
        return tlccArr;
    } else {
        return (
            <span className="text-span-19">{tlcc.showAs}</span>
        )
    }
};

const DocumentMetadata = ({doc, type}) => {
    return(
        <ul className="metadata">
            <li><strong>{T("Document Number")}:</strong> {anFRBRnumber(doc, type).showAs}</li>
            <li><strong>{T("Entry into Force date")}:</strong>  {  anExprFRBRdate(doc, type).date  /*displayDate(gawatiDateEntryInForce(doc, type).date)*/}</li>
            <li><strong>{T("Themes")}:</strong>  {getThemes(doc, type)}</li>
        </ul>
    );
}; 

const supported = ["PDF", "PNG", "DOCX", "XML"];

const renderTabTitle = (doc) => {
    const meta = anMeta2(doc);
    const format = meta.proprietary.gawati.embeddedContents.embeddedContent.type.toUpperCase();
    return (supported.indexOf(format) === -1)? "Unsupported" : format;
};

const DocumentContentInfo = ({doc, type, typeName, iri}) => {
    const formatUc = renderTabTitle(doc)
    const body = anBody(doc, type);
    let mainDocument ;
    if (Array.isArray(body.book)) {
        mainDocument = body.book.filter(book => book.refersTo === '#mainDocument');
    } else {
        mainDocument = body.book;
    }        
    const cRef = mainDocument.componentRef;
    const attLink = documentServer() + substringBeforeLastMatch(cRef.src, "/") + "/" + cRef.alt;
    return (
        <Tabs>
        <TabList>
          <Tab>Metadata</Tab>
          <Tab>Search</Tab>
          <Tab>{formatUc}</Tab>          
        </TabList>
        <TabPanel>
          <DivFeed>
            <DocumentMetadata doc={doc} type={type} />
           </DivFeed>
        </TabPanel>
        <TabPanel>
          <DivFeed>
            <SearchFullText doc={doc} type={type} iri={iri} />
           </DivFeed>
        </TabPanel>        
        <TabPanel>
          <DivFeed>
            <GawatiViewer attLink={attLink} format={formatUc} />
          </DivFeed>
        </TabPanel>
      </Tabs>
    );
}
 
DocumentContentInfo.propTypes = DocumentMetadata.propTypes = {
    doc: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    iri: PropTypes.string.isRequired
}

DocumentMetadata.propTypes = {
    doc: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}

// GawatiViewer.propTypes = {
//     doc: PropTypes.object.isRequired,
// }

class DocumentContentColumn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.match.params['lang'],
            iri: prefixIri(this.props.match.params['iri']),
            loading: true,
            docType : '',
            doc: {
            }
        };
    }
   
    getDocument(iri) {
        let apiDoc = apiGetCall(
            'doc', {
                iri : iri
            } 
        );
        axios.get(apiDoc)
            .then(response => {
                const doc = response.data;
                const objType = anDocType(doc);
                const objState = {
                    loading: false,
                    doc: doc,
                    iri: iri,
                    ...objType
                };
                this.setState(objState);
                document.title =  `${T("african law library")}  ${anDocTitle(doc)}`;
            })
            .catch(function(error) {
                console.log("error in getDocument()", error);
            });
    }


   
    componentDidMount() {      
        this.getDocument(this.state.iri);        
    }

    /**
     * This is required to ensure the page content refreshes when the url param changes for the route
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        //  Fixed :: https://github.com/gawati/gawati-portal-ui/issues/82 
        if (prefixIri(nextProps.match.params['iri']) !== this.state.iri) {           
            this.getDocument(prefixIri(nextProps.match.params['iri']));
        }        
    }    

    render() {
        if (this.state.doc === undefined || isEmpty(this.state.doc)) {
            return (
                <ListingLoading>
                    <h2>Loading...</h2>
                </ListingLoading>
            );
        } else {        
            const {docType, docName, doc, iri} = this.state;
            const lang = this.props.match.params.lang ;
            let content = 
            <DivListing lang={lang}>
                <DocumentBreadcrumb doc={doc} type={docType} typeName={docName} lang={lang} />
                <div className={ `feed w-clearfix`}>
                    <DocumentTitle doc={doc} type={docType} typeName={docName} lang={lang} />
                    <DocumentNavBlock doc={doc} type={docType} typeName={docName} lang={lang} />
                    <DocumentSignature doc={doc} type={docType}  typeName={docName}  lang={lang} />
                    <DocumentActions doc={doc} type={docType}  typeName={docName}  lang={lang} />
                    <DocumentTagCloud doc={doc} type={docType}  typeName={docName}  lang={lang} />
                    <DocumentContentInfo doc={doc} type={docType}  typeName={docName}  iri={iri} lang={lang} />
                </div>
            </DivListing>
            ;
    return content;
    }
    }
}

export default DocumentContentColumn;

