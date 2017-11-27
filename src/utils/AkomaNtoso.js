
export const anDocTypeRoot = (doc, type) => doc.akomaNtoso[type] ; 

export const anMeta = (doc, type) => anDocTypeRoot(doc, type).meta ;

export const anPublication = (doc, type) => anMeta(doc, type).publication ;

export const anFRBRExpression = (doc, type) => anMeta(doc, type).identification.FRBRExpression ;

export const anFRBRWork = (doc, type) => anMeta(doc, type).identification.FRBRWork ;

export const anFRBRcountry = (doc, type) => anFRBRWork(doc, type).FRBRcountry ;

export const anFRBRnumber = (doc, type) => anFRBRWork(doc, type).FRBRnumber ;

export const anFRBRlanguage = (doc, type) => anFRBRExpression(doc, type).FRBRlanguage ;

export const anExprFRBRdate = (doc, type) => anFRBRExpression(doc, type).FRBRdate ;

export const anExprFRBRthis = (doc, type) => anFRBRExpression(doc, type).FRBRthis ;

export const anExprFRBRuri = (doc, type) => anFRBRExpression(doc, type).FRBRuri ;


export const anBody = (doc, type) => {
    let bodyProp = 
        (type === 'act') ? 
        'body': 
        ( (type === 'judgment') ? 'judgmentBody' : 'body' ) ;
    return anDocTypeRoot(doc, type)[bodyProp];
}

export const anBodyComponentRef = (body) =>  body.book.componentRef ;