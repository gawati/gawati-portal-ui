import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NotifBar from './NotifBar';
import ContentColumn from './ContentColumn';
import HomeContentColumn from './HomeContentColumn';
import SideBarColumn from './SideBarColumn';

function ContentArea() {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <NotifBar />
                    <HomeContentColumn />
                    <SideBarColumn />
                </div>
            </div>
        </section>
    );
}

export default ContentArea;