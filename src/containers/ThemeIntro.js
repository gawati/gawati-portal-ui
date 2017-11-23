import React from 'react';
import DivFeed from '../components/DivFeed';
import {homePageFilterWords} from '../constants';

function ThemeIntro() {
    return (
    <DivFeed>
        <h2>Theme of the month: { homePageFilterWords()["name"] }</h2>
        <a>
            <p>The theme of the month is elections !</p>
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