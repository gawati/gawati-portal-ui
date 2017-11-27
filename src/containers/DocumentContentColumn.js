import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {apiGetCall} from '../api';
import {prefixIri, getDocumentType, getDocTypes, isEmpty, getDocType} from '../utils/GeneralHelper';
import {anPublication} from '../utils/AkomaNtoso';
import DocumentBreadcrumb from './DocumentBreadcrumb';
import DocumentNavBlock from './DocumentNavBlock';
import DocumentSignature from './DocumentSignature';
import '../css/react-tabs.css';
import linkIcon from '../images/export.png';


const DocumentLoading = () => 
    <div className={ `left col-9`}>
        <div className="search-result">
        Loading...
        </div>
    </div>;

const DocumentTitle = ({doc, type}) =>
    <h1>{anPublication(doc, type)['showAs']}</h1>;

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
                /*
                const content = response.data.exprAbstracts.exprAbstract;
                this.setState({ 
                    latest: {
                        loading: false, 
                        content : content
                    }
                });
                */
            })
            .catch(function(error) {
                console.log("error in getDocument()", error);
            });
    }


   
    componentDidMount() {
        this.getDocument(this.state.iri);
        
    }

    render() {
        if (this.state.doc === undefined || isEmpty(this.state.doc)) {
            return (
                <DocumentLoading />
            );
        } else {        
            console.log("DOC TYPES ", getDocTypes(), getDocType('act'));
            let content = 
            <div className={ `left col-9`}>
                <div className="search-result">
                    <DocumentBreadcrumb doc={this.state.doc} type={this.state.docType} />
                    <div className={ `feed w-clearfix`}>
                    <DocumentTitle doc={this.state.doc} type={this.state.docType} />
                    <DocumentNavBlock doc={this.state.doc} type={this.state.docType} />
                    <DocumentSignature doc={this.state.doc} type={this.state.docType} />

                    <div className="document-download">
                        <div className={ `col-3 left`}>
                            <a href="#">Back to search</a>
                        </div>
                        <div className={ `col-9 right`}>
                            <ul>
                                <li>
                                    <a href="#">Subscribe</a>
                                </li>
                                <li>
                                    <a href="#">Copy Reference</a>
                                </li>
                                <li>
                                    <a href="#">Download PDF</a>
                                </li>
                                <li>
                                    <a href="#">Download XML</a>
                                </li>
                                <li>
                                    <a href="#">Share</a>
                                </li>
                            </ul>
                        </div>
                    </div>

        <div className="part-of"> Part of the <a href="#"> Mixed Market Act 1991</a>. Work <a
                href="#">Search within this Work</a> &#160;| &#160;<a href="#">Timeline of the
                Work</a>
        </div>

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

        <div className="d-tabs">
            <ul className="tab-menu">
                <li>
                    <a href="#" className={ `tab active`}>Content</a>
                </li>
            </ul>
        </div>

        <div className={ `tabs-content w-tab-content`}>
            <div className={ `tab-pane tab-active`} data-tab="t1">
                <div className={ `feed clearfix`}>
                    <div className="paginations">
                        <a href="#"> &lt; </a>
                        <a href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">6</a>
                        <a href="#">7</a>
                        <a href="#"> &gt; </a>
                    </div>
                    <p>An act of Parliament to give effect to article 35 of the Constitutio, to
                        conder on the commission on Administrative Justice the oversight and
                        enforcement function and powers and for connected purposes</p>

                    <h3>1. Preliminary</h3>
                    <p>Short title <br/> This act may be cited as the Mixed Market Act, 2017- </p>

                    <h3>2. Interpretation</h3>
                    <p>In this Act, unless the context otherwise requiers ...: "Cabinet
                        Secretary" means the Cabinet Secreatry for the time bein responsible for
                        matters relating to information; "chies executive officer" of a public
                        body or private bode means the Pricipal Secretary in the case of a
                        Goverment Mnistry or Departament, managing diector in the case of a
                        corporrate body, or the person assigned the principal administrative
                        responsibility in any body by whatever tittle and "citizen" means any
                        individual who has Kenyan citizenship, and ay private entity that is
                        controlled byt one or more Kenyan citizens.</p>

                    <p>"Commissions" means the Commission on Administrative Justice established
                        by section 3 of the Commission on Administrative Justice Act, N° 23 of
                        2011;</p>

                    <p>"edited copy" in relation to a document, means a copy of a document from
                        which exempt information has been deleted; "electronic record" means a
                        record generated in digital form by an information system, which can be
                        transmitted within an information system or from one infromation to
                        another and stored in a information system or other medium.</p>


                    <div className="paginations">
                        <a href="#"> &lt; </a>
                        <a href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">6</a>
                        <a href="#">7</a>
                        <a href="#"> &gt; </a>
                    </div>

                </div>
            </div>

  
        </div>

    </div>
</div>
</div>;
    return content;
    }
    }
}

/*
const Loading = ({tab}) => 
    <div className={ `tab-pane tab-active` } data-tab="t`${tab}`">
        Loading...
    </div>;
*/

export default DocumentContentColumn;