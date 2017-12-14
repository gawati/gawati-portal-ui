import React from 'react';

import { anBody, anBodyComponentRef, anExprFRBRthis } from '../utils/akomantoso';
import { dataProxyServer, documentServer } from '../constants';
import { substringBeforeLastMatch } from '../utils/stringhelper';
import { apiUrl } from '../api';

const DocumentPdfLink = ({doc, type}) => {
    let body = anBody(doc, type);
    let cRef = anBodyComponentRef(body);

    let refSrc = cRef.src;
    let refAlt = cRef.alt;
    let url = documentServer() + substringBeforeLastMatch(refSrc, "/") + "/" + refAlt;
    return (
        <a href={ url } title={ `open ${refAlt} in a new window` } target="_blank">PDF</a>
    );
}

const DocumentXmlLink = ({doc, type}) => {
    let proxyUrl = apiUrl('doc-xml') + "?iri=" + anExprFRBRthis(doc, type).value; 
    let url = dataProxyServer() + proxyUrl ;
    return (
        <a href={ url } title="XML download" target="_blank">XML</a>
    );
}


const DocumentActions = ({doc, type}) => 
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
                        <DocumentXmlLink doc={doc} type={type} />
                    </li>
                    <li>
                        <DocumentPdfLink doc={doc} type={type} />
                    </li>
                    <li>
                        <a href="#">Share</a>
                    </li>
                </ul>
            </div>
        </div>;

export default DocumentActions;
