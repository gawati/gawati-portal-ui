import React from 'react';
import ThemeIntro from './ThemeIntro';
import DivFeed from '../components/DivFeed';
import linkIcon from '../images/export.png';

function ThemeOfTheMonth() {
return (
    <div className={ `tab-pane tab-active` } data-tab="t1">
        <ThemeIntro />
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
        <div className="button-wrapper">
            <a className={ `button w-button` } href="/all-posts">More posts&#160;→</a>
        </div>
    </div>
);
}

export default ThemeOfTheMonth;