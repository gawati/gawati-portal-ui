import React from 'react';
import {Link} from 'react-router-dom';

const DocumentLink = ({abstract, lang, children}) => {
    return (
        <Link to={'/_lang/' + lang + '/doc/_iri' + abstract['expr-iri']}>{children}</Link>
    );
};

export default DocumentLink; 