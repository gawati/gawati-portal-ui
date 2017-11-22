import React from 'react';
import DivFeed from '../components/DivFeed';

function ThemeIntro() {
    return (
    <DivFeed>
        <h2>Theme of the month</h2>
        <div className="text-block">
            <a href="#"> AUTOR NAME </a>
            <a> &#160;| &#160; </a>
            <a href="#">CATEGORY</a>
            <a> &#160;| &#160;</a>
            <a href="#">July 25, 2017 </a>
            <a> </a>
        </div>
        <a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                tristique posuere.</p>
        </a>
        { /*
        <a className="more-button" href="#">
            <img src={ linkIcon }/>
        </a>
        */ }
        <div className="grey-rule"/>
    </DivFeed>        
    );
}

export default ThemeIntro;