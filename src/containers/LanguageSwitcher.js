import React from 'react';
import { getLangs } from "../utils/i18nhelper";
import '../css/LanguageSwitcher.css';

const LanguageSwitcher = ({i18n}) => {
    console.log(" LanguageSwitcher ", i18n, i18n.language);
    return (
        <ul className="list-inline"> 
        {
            getLangs().map(
                lang => 
                    <li key={ `ui-lang-${lang.lang}`} className={ `list-inline-item ui-lang-item ${ lang.lang === i18n.language ? "ui-lang-highlight": "" }`}>
                    <button onClick={() => i18n.changeLanguage(lang.lang)}>{lang.content}</button>
                    </li>
            ) 
        }
        </ul>
    );
}
;

export default LanguageSwitcher;
