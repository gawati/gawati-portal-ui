import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Aux = props => props.children;

function Page({children}){
   return (
    <Aux>
        <div className="div-block-2 w-clearfix" id="top1">
            <div className="div-block-4 col-2"></div>
            <div className="div-block-5 col-2"></div>
            <div className="div-block-6 col-2"></div>
            <div className="div-block-7 col-2"></div>
            <div className="div-block-8 col-2"></div>
            <div className="div-block-9 col-2"></div>
            <div className="div-block-10 col-2"></div>
        </div>
        {children}
    </Aux>
   );
}


export default Page;