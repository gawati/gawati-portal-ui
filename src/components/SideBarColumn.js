import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


function SideBarColumn() {
    return (
        <div class="right col-3">
            <div class="w-clearfix white-wrapper">
                <h2 class="small-heading">Date</h2>
                <ul class="since">
                    <li>
                        <a href="#">Since 2017 100 + </a>
                    </li>
                    <li>
                        <a href="#">Since 2016 600 + </a>
                    </li>
                    <li>
                        <a href="#">Since 2015 400 + </a>
                    </li>
                    <li class="date-selection">
                        <div>
                            <a href="#" class="between-button">+ Between </a>
                            <br/>
                            <input type="text" name="daterange" value="01/01/2017 - 01/31/2017"
                                style="display: none;" class="between-date"/>

                            <a href="#" class="this-date-button">+ This date </a>
                            <input type="text" name="thisdate" value="01/01/2017" style="display: none;"
                                class="this-date"/>

                        </div>
                    </li>
                </ul>

                <div class="grey-rule"/>

                <h2 class="small-heading">Legal documents</h2>
                <ul>
                    <li>
                        <a href="#">Legislation 10000 + </a>
                    </li>
                    <li>
                        <a href="#">Case law 20000 + </a>
                    </li>
                    <li>
                        <a href="#">Reports 1000 + </a>
                    </li>
                    <li>
                        <a href="#">Articles 11000 + </a>
                    </li>
                    <li class="click-more"> + More <ul class="see-more">
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                        </ul>
                    </li>
                </ul>
                <div class="grey-rule"/>

                <h2 class="small-heading">Countries</h2>
                <ul>
                    <li>
                        <a href="#">Kenya 500 + </a>
                    </li>
                    <li>
                        <a href="#">Burkina Faso 200 +</a>
                    </li>
                    <li>
                        <a href="#">Togo 200 +</a>
                    </li>
                    <li>
                        <a href="#">Togo 200 +</a>
                    </li>
                    <li class="click-more"> + More <ul class="see-more">
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                        </ul>
                    </li>
                </ul>

                <div class="grey-rule"/>

                <h2 class="small-heading">Partners</h2>
                <ul>
                    <li>
                        <a href="#">Kenya 500 + </a>
                    </li>
                    <li>
                        <a href="#">Burkina Faso 200 +</a>
                    </li>
                    <li>
                        <a href="#">Togo 200 +</a>
                    </li>
                    <li>
                        <a href="#">Togo 200 +</a>
                    </li>
                    <li class="click-more"> + More <ul class="see-more">
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                        </ul>
                    </li>
                </ul>

                <div class="grey-rule"/>

                <h2 class="small-heading">Subjects</h2>
                <ul>
                    <li>
                        <a href="#">Social Justice 900 +</a>
                    </li>
                    <li>
                        <a href="#">Economic Model 20 +</a>
                    </li>
                    <li>
                        <a href="#">Constitutional reform 90 +</a>
                    </li>
                    <li class="click-more"> + More <ul class="see-more">
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                            <li><a href="#">dummy link</a></li>
                        </ul>
                    </li>
                </ul>

                <div class="grey-rule"/>

                <p class="cc-law-libray">The African Law Library</p>
            </div>
        </div>
    );
}

export default SideBarColumn;