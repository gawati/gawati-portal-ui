import React from 'react';
import {Link} from 'react-router-dom';

const DocumentLink = ({abstract, children}) => {
    return (
        <Link to={'/doc/_lang/en/_iri' + abstract['expr-iri']}>{children}</Link>
    );
};

export default DocumentLink; 