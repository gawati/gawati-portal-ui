
/*
 * Allowed Akoma Ntoso XML root types
 */ 
export const ALLOWED_ROOT_TYPES = [
    'act', 
    'amendment',
    'amendmentList',
    'bill',
    'debate',
    'debateReport',
    'doc',
    'documentCollection',
    'judgment',
    'officialGazette',
    'portion',
    'statement'
];

/**
 * Gets the document type of an Akoma Ntoso JSON object
 * @param {object} doc 
 */
export const anDocType = (doc) => {
    const aknDocType =  Object.keys(doc.akomaNtoso).find( 
        (key) => {
            return ALLOWED_ROOT_TYPES.indexOf(key) !== -1 ;
        }
    );
    var objDocType = {};
    objDocType["docType"] = aknDocType ; 
    if (doc.akomaNtoso[aknDocType].name) {
        objDocType["docName"] = doc.akomaNtoso[aknDocType].name ; 
    }
    return objDocType;
};

/**
 * Returns a docTitle
 * 
 * @param  {object} doc
 */
export const anDocTitle = (doc) => {
    return doc.akomaNtoso[anDocType(doc)].meta.publication.showAs;
};

/**
 * Returns the root element for the doc Type
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anDocTypeRoot = (doc, type) => doc.akomaNtoso[type] ; 

/**
 * Returns the meta element for the document
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anMeta = (doc, type) => anDocTypeRoot(doc, type).meta ;

/**
 * @param  {object} doc
 * @param  {string} type
 */
export const anPublication = (doc, type) => anMeta(doc, type).publication ;

/**
 * Returns the FRBRExpression element
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anFRBRExpression = (doc, type) => anMeta(doc, type).identification.FRBRExpression ;

/**
 * Returns the FRBRWork element
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anFRBRWork = (doc, type) => anMeta(doc, type).identification.FRBRWork ;

/**
 * Returns the FRBRCountry element
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anFRBRcountry = (doc, type) => anFRBRWork(doc, type).FRBRcountry ;

/**
 * Returns the FRBRnumber element
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anFRBRnumber = (doc, type) => anFRBRWork(doc, type).FRBRnumber ;

/**
 * Returns the FRBRlanguage element
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anFRBRlanguage = (doc, type) => anFRBRExpression(doc, type).FRBRlanguage || undefined  ;

/**
 * Returns the FRBRdate element
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anExprFRBRdate = (doc, type) => anFRBRExpression(doc, type).FRBRdate || undefined ;

/**
 * Returns the FRBRthis element (under FRBRExpression)
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anExprFRBRthis = (doc, type) => anFRBRExpression(doc, type).FRBRthis || undefined ;

/**
 * Returns the FRBRuri element (under FRBRExpression)
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anExprFRBRuri = (doc, type) => anFRBRExpression(doc, type).FRBRuri || undefined ;

/**
 * Returns the classification element 
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anClassification = (doc, type) => {
    const meta = anMeta(doc, type);
    if (meta.classification) {
        return meta.classification;
    } else {
        return null;
    }
};

/**
 * Returns the keyword elements (under classification)
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anKeywords = (doc, type) => {
    const classif = anClassification(doc, type);
    if (classif) {
        if (classif.keyword) {
            return classif.keyword;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

/**
 * Returns the references element 
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anReferences = (doc, type) => anMeta(doc, type).references || undefined ;

/**
 * Returns the TLCConcept elements under references 
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anTLCConcept = (doc, type) => anReferences(doc, type).TLCConcept || undefined

/**
 * Returns the proprietary element 
 * 
 * @param  {object} doc
 * @param  {string} type
 */
export const anProprietary = (doc, type) => anMeta(doc, type).proprietary ;

/**
 * Returns the body element name of the document based on the type
 * 
 * @param  {object} docType string
 */
export const anBodyElementNameFromType = (docType) => {
    switch(docType) {
        case 'documentCollection': 
        case 'officialGazette':
        case 'amendmentList':
            return 'collectionBody';
        case 'judgment': 
            return 'judgmentBody';
        case 'debateReport':
        case 'doc':
        case 'statement':
            return 'mainBody';
        case 'act':
        case 'bill':
            return 'body';
        case 'amendment':
            return 'amendmentBody';
        case 'portion':
            return 'portionBody';
        case 'debate':
            return 'debateBody';
        default:
            return 'unknown';
    }
};

/**
 * Returns the body element 
 * 
 * @param  {object} doc string
 */
export const anBody = (doc) => {
    const docType = anDocType(doc).docType;
    const bodyProp = anBodyElementNameFromType(docType);
    return anDocTypeRoot(doc, docType)[bodyProp];
};


/**
 * Returns the body element for a document with only pdf content
 * 
 * @param  {object} doc string
 */
export const anBodyComponentRef = (body) =>  {
    if (body.book) {
        if (body.book.componentRef) {
            return body.book.componentRef;
        } else {
            return null;
        }
    } else {
        return null;
    }
}
/**
 * @param  {string} iri
 */
export const iriComponents = (iri) => iri.split("/").filter((item) => item !== "");

/**
 * Get AKN doc type from IRI
 * @param  {string} iri
 */
export const aknDocTypeFromIri = (iri) => {
    const iriCompos = iriComponents(iri);
    return iriCompos[2];
};

/**
 * Get AKN country code from IRI
 * @param  {string} iri
 */
export const aknCountryCodeFromIri = (iri) => {
    const iriCompos = iriComponents(iri);
    return iriCompos[1];
};

/**
 * Returns collection components
 * @param  {} doc
 */
export const aknCollectionContents = (doc) => {
    const docType = anDocType(doc).docType;
    if (docType === "documentCollection") {
        const collectionBody = anBody(doc);
        const collComponents = collectionBody.component;
        return collComponents.map( (item) => item.documentRef );
    } else {
        return null;
    }
};

/**
 * Returns the meta element of a document
 * @param  {object} doc
 */
export const anMeta2 = (doc) => {
    const {docType} = anDocType(doc);
    return anMeta(doc, docType );
};
