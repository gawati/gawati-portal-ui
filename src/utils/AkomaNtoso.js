
export const anPublication = (doc, type) => doc.akomaNtoso[type].meta.publication ;

export const anFRBRcountry = (doc, type) => doc.akomaNtoso[type].meta.identification.FRBRWork.FRBRcountry ;

export const anExprFRBRdate = (doc, type) => doc.akomaNtoso[type].meta.identification.FRBRExpression.FRBRdate ;

export const anFRBRnumber = (doc, type) => doc.akomaNtoso[type].meta.identification.FRBRWork.FRBRnumber ;

export const anFRBRlanguage = (doc, type) => doc.akomaNtoso[type].meta.identification.FRBRExpression.FRBRlanguage ;