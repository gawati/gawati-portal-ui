import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PageUpperBorder from './PageUpperBorder';

const Aux = props => props.children;

function Page({children}){
   return (
    <Aux>
        <PageUpperBorder />
        {children}
    </Aux>
   );
}


export default Page;