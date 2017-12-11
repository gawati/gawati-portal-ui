import React from 'react';
import Filter from '../containers/Filter';

function SideBarColumn() {
    return (
        <div className={ `right col-3` }>
            <div className={ `w-clearfix white-wrapper` }>
                <Filter />
                <p className="cc-law-libray">The African Law Library</p>
            </div>
        </div>
    );
}

export default SideBarColumn;

/**
   <h2 className="small-heading">Date</h2>
                <ul className="since">
                    <li>
                        <a href="javascript:;">Since 2017 100 + </a>
                    </li>
                    <li>
                        <a href="javascript:;">Since 2016 600 + </a>
                    </li>
                    <li>
                        <a href="javascript:;">Since 2015 400 + </a>
                    </li>
                    <li className="date-selection">

                        <div>
                        <a href="javascript:;" className="between-button">+ Between </a>
                        <br/>
                        <input type="text" name="daterange" value="01/01/2017 - 01/31/2017"
                            style="display: none;" className="between-date"/>

                        <a href="javascript:;" className="this-date-button">+ This date </a>
                        <input type="text" name="thisdate" value="01/01/2017" style="display: none;"
                            className="this-date"/>

                    </div>

                    </li>
                </ul>

                <div className="grey-rule"/>

                <h2 className="small-heading">Legal documents</h2>
                <ul>
                    <li>
                        <a href="javascript:;">Legislation 10000 + </a>
                    </li>
                    <li>
                        <a href="javascript:;">Case law 20000 + </a>
                    </li>
                    <li>
                        <a href="javascript:;">Reports 1000 + </a>
                    </li>
                    <li>
                        <a href="javascript:;">Articles 11000 + </a>
                    </li>
                    <li className="click-more"> + More <ul className="see-more">
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                        </ul>
                    </li>
                </ul>
                <div className="grey-rule"/>

                <h2 className="small-heading">Countries</h2>
                <ul>
                    <li>
                        <a href="javascript:;">Kenya 500 + </a>
                    </li>
                    <li>
                        <a href="javascript:;">Burkina Faso 200 +</a>
                    </li>
                    <li>
                        <a href="javascript:;">Togo 200 +</a>
                    </li>
                    <li>
                        <a href="javascript:;">Togo 200 +</a>
                    </li>
                    <li className="click-more"> + More <ul className="see-more">
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                        </ul>
                    </li>
                </ul>

                <div className="grey-rule"/>

                <h2 className="small-heading">Partners</h2>
                <ul>
                    <li>
                        <a href="javascript:;">Kenya 500 + </a>
                    </li>
                    <li>
                        <a href="javascript:;">Burkina Faso 200 +</a>
                    </li>
                    <li>
                        <a href="javascript:;">Togo 200 +</a>
                    </li>
                    <li>
                        <a href="javascript:;">Togo 200 +</a>
                    </li>
                    <li className="click-more"> + More <ul className="see-more">
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                        </ul>
                    </li>
                </ul>

                <div className="grey-rule"/>

                <h2 className="small-heading">Subjects</h2>
                <ul>
                    <li>
                        <a href="javascript:;">Social Justice 900 +</a>
                    </li>
                    <li>
                        <a href="javascript:;">Economic Model 20 +</a>
                    </li>
                    <li>
                        <a href="javascript:;">Constitutional reform 90 +</a>
                    </li>
                    <li className="click-more"> + More <ul className="see-more">
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                            <li><a href="javascript:;">dummy link</a></li>
                        </ul>
                    </li>
                </ul>

                <div className="grey-rule"/> 
 
 */