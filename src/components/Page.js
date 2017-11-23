import React from 'react';
import PageUpperBorder from './PageUpperBorder';
import {Aux} from '../utils/GeneralHelper';

function Page({children}){
   return (
    <Aux>
        <PageUpperBorder />
        {children}
    </Aux>
   );
}


export default Page;