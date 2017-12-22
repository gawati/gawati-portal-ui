import React from 'react';
import {Aux} from '../utils/generalhelper';
import {substringBeforeLastMatch } from '../utils/stringhelper';
import {documentServer} from '../constants';
import {anBody} from '../utils/akomantoso';
//import { Document, Page } from 'react-pdf';

class DocumentPDF extends React.Component { 

    constructor(props) {
        super(props);
    }

    render() {
        let doc = this.props.doc;
        let type = this.props.type;

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
            {/*  
            <Document
                onLoadSuccess={this.onDocumentLoad}
                file={`${pdfLink}`}
            > {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ),
                )
            }
            </Document>
            */}
        
            <object data={`${pdfLink}#page=1`} type="application/pdf" width="100%" height="100%">
                <iframe src={`${pdfLink}#page=1`} width="100%" height="100%" >
                This browser does not support PDFs. Please download the PDF to view it:
                    <a href={`${pdfLink}`}>Download PDF</a>
                </iframe>
            </object>
        
            </div>
        </Aux>	
        );
    }
};

export default DocumentPDF;

