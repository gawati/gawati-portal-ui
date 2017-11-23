import React from 'react';
import axios from 'axios';
import querystring from 'querystring';
import DivFeed from '../components/DivFeed';
import {apiGetCall} from '../api';
import ExprAbstract from './ExprAbstract';
import {Aux} from '../utils/GeneralHelper';
import {homePageFilterWords} from '../constants';
import linkIcon from '../images/export.png';


class ThemeSummary extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            abstracts : []
        };
    }

    componentDidMount() {
        let apiThemesSummary = apiGetCall(
            'themes-summary', {
                themes : homePageFilterWords()["keywords"],
                count : 10,
                from: 1,
                to: 10
            } 
        );
        axios.get(apiThemesSummary)
            .then(response => {
                const abstracts = response.data.exprAbstracts.exprAbstract;
                console.log( abstracts );
                this.setState({abstracts});
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    render() {
        return (
         <Aux>
             {
               this.state.abstracts.map(abstract => {
                   return (
                    <ExprAbstract key={abstract['expr-iri']} abstract={abstract} />   
                   )
                }
               )
             }
         </Aux>
        )
    }
}

export default ThemeSummary;