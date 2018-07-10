import React from 'react';

import HomeContentColumn from '../containers/HomeContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';

class HomeContentArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            el: null,
            flexDirection: null
        };
        this.setFlexDirection = this.setFlexDirection.bind(this);
    }


    setFlexDirection = (el) => {
        if (el) {
            this.el = el;
        }
    }

    componentDidMount = () => {
        if (this.el) {
            this.setState({'flexDirection': window.getComputedStyle(this.el,null).flexDirection});
        }
    }

    render() {
        const {match} = this.props;
        return (
            <Section setFlexDirection={this.setFlexDirection} altClasses="home-content-area home">
                <HomeContentColumn lang={match.params.lang}/>
                <SideBarColumn match={match} setCollapsible={this.props.setCollapsible} slideToggle={this.props.slideToggle} flexDirection={this.state.flexDirection}/>
            </Section>
        );
    
    }
}

export default HomeContentArea;