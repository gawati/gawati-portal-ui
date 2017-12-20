import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DivFeed from '../components/DivFeed';

import {apiGetCall} from '../api';
import {Aux, prefixIri, getDocumentType, getDocTypes, isEmpty, getDocType, displayDate, randomInt, insertIntoArray} from '../utils/generalhelper';
import { substringBeforeLastMatch } from '../utils/stringhelper';
import {documentServer} from '../constants';
import {anPublication, anFRBRnumber, anKeywords, anTLCConcept, anExprFRBRdate, anBody} from '../utils/akomantoso';
import {gawatiDateEntryInForce} from '../utils/gawati';

import DocumentBreadcrumb from './DocumentBreadcrumb';
import DocumentNavBlock from './DocumentNavBlock';
import DocumentSignature from './DocumentSignature';
import DocumentActions from './DocumentActions';
import 'react-tabs/style/react-tabs.css';
import '../css/react-tabs.css';
import '../css/DocumentTagCloud.css';
import '../css/DocumentPDF.css';
import linkIcon from '../images/export.png';



const DocumentLoading = () => 
    <div className={ `left col-9`}>
        <div className="search-result">
        Loading...
        </div>
    </div>;

const DocumentTitle = ({doc, type}) =>
    <h1>{anPublication(doc, type)['showAs']}</h1>;


const DocumentPartOf = ({doc, type}) => {
    return (
        <div className="part-of"> Part of the <a href="#"> Mixed Market Act 1991</a>. Work <a
        href="#">Search within this Work</a> &#160;| &#160;<a href="#">Timeline of the
        Work</a>
        </div>
    );
}

const DocumentTagCloud = ({doc, type}) => {
    let kws = anKeywords(doc, type);
    if (Array.isArray(kws)) {
        return (
            <div className="tag-cloud">
            <strong>TAGS:</strong>&#160;
                {
                kws.map(
                    (item) => {
                        let randint = randomInt(14, 28);
                        return (
                        <span key={item.value} className={ `text-span-${randint} tag-item` }>{item.showAs} </span>
                        );
                    }
                )
                }
            </div>
        );
    } else {
        return (
            <div className="tag-cloud">
            <span className="text-span-18">{kws.showAs}</span>
            </div>
        );
    }
        /*
    return (
        <div className="tag-cloud" >
            <span className="text-span-14">act </span><span className="text-span-13">Administrative
                </span><span className="text-span-27">assigned </span><span>body </span><span
                className="text-span-15">cabinet </span><span>case </span><span className="text-span-28"
                >chief </span><span className="text-span-20">citizen </span><span>citizenship
                </span><span>commission </span><span className="text-span-21">contolled
                </span><span>copy </span><span>corporate </span><span className="text-span-30"
                >deleted</span> deparment <span className="text-span-22">digital </span><span
                className="text-span-12">director</span>
            <span className="text-span-23">document </span>electronic <span>entity </span><span
                className="text-span-29">exempt </span><span>form </span><span className="text-span-16"
                >generated </span><span className="text-span-17">government
                </span><span>individual</span>
            <span className="text-span-19">information </span><span className="text-span-18"
                >justice</span>
        </div>
    ); 
    */
}

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
            <li><strong>Document Number:</strong> {anFRBRnumber(doc, type).showAs}</li>
            <li><strong>Entry into Force date:</strong>  {  anExprFRBRdate(doc, type).date  /*displayDate(gawatiDateEntryInForce(doc, type).date)*/}</li>
            <li><strong>Themes:</strong>  {getThemes(doc, type)}</li>
        </ul>
    );
}; 

const DocumentPDF = ({doc, type}) => {
    let body = anBody(doc, type);
    
    let mainDocument ;
    if (Array.isArray(body.book)) {
        mainDocument = body.book.filter(book => book.refersTo === '#mainDocument');
    } else {
        mainDocument = body.book;
    }
    
    let cRef = mainDocument.componentRef;
    let pdfLink = documentServer() + substringBeforeLastMatch(cRef.src, "/") + "/" + cRef.alt ;
    return (
    <Aux>
        <br />
        <div className="pdfview">
        <object data={`${pdfLink}#page=1`} type="application/pdf" width="100%" height="100%">
            <iframe src={`${pdfLink}#page=1`} width="100%" height="100%" >
            This browser does not support PDFs. Please download the PDF to view it:
                <a href={`${pdfLink}`}>Download PDF</a>
            </iframe>
        </object>
        </div>
    </Aux>	
    );
};

const DocumentContentInfo = ({doc, type}) => {
    return (
        <Tabs>
        <TabList>
          <Tab>Metadata</Tab>
          <Tab>PDF</Tab>
        </TabList>
        <TabPanel>
          <DivFeed>
            <DocumentMetadata doc={doc} type={type} />
           </DivFeed>
        </TabPanel>
        <TabPanel>
          <DivFeed>
            <DocumentPDF doc={doc} type={type} />
          </DivFeed>
        </TabPanel>
      </Tabs>
    );
}
 
DocumentContentInfo.propTypes = DocumentMetadata.propTypes = {
    doc: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}

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
                this.setState({
                    loading: false,
                    doc: doc,
                    docType: getDocumentType(doc)
                });
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
        this.getDocument(prefixIri(nextProps.match.params['iri']));
    }    

    render() {
        if (this.state.doc === undefined || isEmpty(this.state.doc)) {
            return (
                <DocumentLoading />
            );
        } else {        
            console.log("DOC TYPES ", this.props.match);
            let content = 
            <div className={ `left col-9`}>
                <div className="search-result">
                    <DocumentBreadcrumb doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                    <div className={ `feed w-clearfix`}>
                        <DocumentTitle doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                        <DocumentNavBlock doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                        <DocumentSignature doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                        <DocumentActions doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                        <DocumentTagCloud doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                        <DocumentContentInfo doc={this.state.doc} type={this.state.docType}  lang={this.props.match.params.lang} />
                    </div>
                </div>
            </div>
            ;
    return content;
    }
    }
}

export default DocumentContentColumn;

