
export const gawati = () => window.gawati ;

export const documentServer = () => gawati().GAWATI_DOCUMENT_SERVER ;

export const dataProxyServer = () => 
    process.env.NODE_ENV === 'development' ? "" : gawati().GAWATI_PROXY ;

export const homePageFilterWords = () => ({
    "name":"Trade",
    "description": "The theme of the month is Trade !",
    "keywords":["trade", "goods", "supplies"]
})

export const documentTypes = () => ["act", "doc", "judgment"];

