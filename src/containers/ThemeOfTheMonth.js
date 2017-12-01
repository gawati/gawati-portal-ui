import React from 'react';

import {homePageFilterWords} from '../constants';
import {Aux} from '../utils/generalhelper';

import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';

const ThemeOfTheMonth = ({themes, tab}) =>
    <div className={ `tab-pane tab-active` } data-tab="t`${tab}`">
        <ThemeIntro />
        <ThemeSummary themes={themes} />
        {
            /*
        <div className={ `feed w-clearfix` }>
            <h2>This is the second tittle.</h2>
            <div className="text-block">
                <a href="#"> AUTOR NAME </a>
                <a> &#160;| &#160; </a>
                <a href="#">CATEGORY</a>
                <a> &#160;| &#160;</a>
                <a href="#">July 25, 2017 </a>
                <a> </a>
            </div>
            <a>
                <img src="images/thumbnail.jpg"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                    enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                    dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                    nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                    tristique posuere.</p>
            </a>
            <div className={ `div-block-18 w-clearfix` }>
                <a> </a>
                <a className="more-button" href="#">
                    <img src={ linkIcon } />
                </a>
            </div>
            <div className="grey-rule"/>
        </div>
        <div className={ `feed w-clearfix` }>
            <h2>This is the tittle after the second</h2>
            <div className="text-block">
                <a href="#"> AUTOR NAME </a>
                <a> &#160;| &#160; </a>
                <a href="#">CATEGORY</a>
                <a> &#160;| &#160;</a>
                <a href="#">July 25, 2017 </a>
                <a> </a>
            </div>
            <a>
                <img src="images/thumbnail.jpg"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                    enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                    dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                    nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                    tristique posuere.</p>
            </a>
            <div className={ `div-block-18 w-clearfix` }>
                <a> </a>
                <a className="more-button" href="#">
                    <img src={ linkIcon }  />
                </a>
            </div>
            <div className="grey-rule"/>
        </div>
        */}
        <div className="button-wrapper">
            <a className={ `button w-button` } href={ `/themes/_lang/eng/_themes/${homePageFilterWords()["keywords"].join("|") }/_count/10/_from/1/_to/10`}>More posts&#160;→</a>
        </div>
    </div>
    ;

const ThemeIntro = () => {
        let homePageIntro = homePageFilterWords();
        return (
        <DivFeed>
            <h2>Theme of the month: { homePageIntro["name"] }</h2>
            <a>
                <p>{ homePageIntro["description"] }</p>
            </a>
            <div className="grey-rule"/>
        </DivFeed>        
        );
}

const ThemeSummary = ({themes}) => 
        <Aux>
        {
            themes.map(abstract => {
                return (
                <ExprAbstract key={abstract['expr-iri']} abstract={abstract} />   
                )
            })
        }
        </Aux>
        ;

export default ThemeOfTheMonth;