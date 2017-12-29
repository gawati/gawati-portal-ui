import React from 'react';
import {substringBeforeLastMatch } from '../utils/stringhelper';
import {documentServer} from '../constants';
import {anBody} from '../utils/akomantoso';
//import PDF from 'react-pdf-js';
import { Document, Page } from 'react-pdf';

/*
class DocumentPDF extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
      }
    
    onPageComplete = (page) => {
    this.setState({ page });
    }
    
    handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
    }
    
    handleNext = () => {
    this.setState({ page: this.state.page + 1 });
    }

    renderPagination = (page, pages) => {
        let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
        if (page === 1) {
          previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
        }
        let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
        if (page === pages) {
          nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
        }
        return (
          <nav>
            <ul className="pager">
              {previousButton}
              {nextButton}
            </ul>
          </nav>
          );
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

        let pagination = null;
        
        if (this.state.pages) {
          pagination = this.renderPagination(this.state.page, this.state.pages);
        }
        return (
        <div>
            <PDF
            file="somefile.pdf"
            onDocumentComplete={this.onDocumentComplete}
            onPageComplete={this.onPageComplete}
            page={this.state.page}
            />
            {pagination}
        </div>
        )

        return (
          <div className="pdfview">
            <PDF
              file={`${pdfLink}`} 
              onDocumentComplete={this.onDocumentComplete}
              onPageComplete={this.onPageComplete}
              page={this.state.page}
              fillWidth 
            />
            {pagination}
          </div>
        );        
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
            <PDF file={`${pdfLink}`} fillWidth>
                <iframe src={`${pdfLink}`} width="100%" height="100%" >
                This browser does not support PDFs. Please download the PDF to view it:
                    <a href={`${pdfLink}`}>Download PDF</a>
                </iframe>
            </PDF>
            </div>
        </Aux>	
        );
    }
   
};

*/
class DocumentPDF extends React.Component {
    state = {
      numPages: null,
      pageNumber: 1,
    }
  
    onDocumentLoad = ({ numPages }) => {
        console.log( " NUM PAGES ", numPages);
      this.setState({ numPages });
    }
  
    render() {
      const { pageNumber, numPages } = this.state;
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
        <div>
          <Document
            file={ pdfLink }
            onLoadSuccess={this.onDocumentLoad}
          >
            {
                /** !+FIX_THIS add a paginator here since this loads all the pages, we need to show 
                 * page by page
                 */
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
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      );
    }
  }


export default DocumentPDF;

