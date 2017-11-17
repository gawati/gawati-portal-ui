import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NotifBar from './NotifBar';

function ContentArea() {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <NotifBar />
                    <ContentColumn />
                    <SideBarColumn />
                </div>
            </div>
        </section>
    );
}

export default ContentArea;