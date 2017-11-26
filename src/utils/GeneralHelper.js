
export const Aux = props => props.children;

export function stringCut(i, text) {
    var short = text.substr(0, i);
    if (/^\S/.test(text.substr(i)))
        return short.replace(/\s+\S*$/, "");
    return short;
}

export function shortTitle(theTitle) {
    if (theTitle.length <= 80) {
        return theTitle;
    } else {
        return stringCut(80, theTitle) + "...";
    }
}

export const prefixIri = (iri) => 
     iri.startsWith('/') ? iri : "/" + iri;
