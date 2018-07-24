import React from 'react';
import {T} from '../utils/i18nhelper';



const DocumentSignature = ({doc, type}) =>
            <div className="document-warning"> {T(
                    "document not signed")}
            </div>
            ;

export default DocumentSignature;
