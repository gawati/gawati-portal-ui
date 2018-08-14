import React from 'react';
import socialApps from '../configs/social.json';
import { getUserProfile, getUserSettings } from '../utils/GawatiAuthClient';

class FBLike extends React.Component {

    constructor (props) {
        super();
        this.state = {lang: props.lang};
        this.state.Like = <span></span>;
        this.state.FacebookProvider = <span></span>;
        // if (process.env.REACT_APP_FB === 'yes') {
        //     this.state.FacebookProvider = require('react-facebook').FacebookProvider;
        //     this.state.Like = require('react-facebook').Like;
        // }
        getUserProfile().success((data) => {
            getUserSettings(data.userName).then((response) =>{
                if (response.data.data.socialMedia) {
                    this.state.social = true;
                    this.state.FacebookProvider = require('react-facebook').FacebookProvider;
                    this.state.Like = require('react-facebook').Like;
                }
            });
        })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.lang !== this.state.lang) {
            this.setState({"lang": nextProps.lang});
        }
    }


    render () {
        const FacebookProvider = this.state.FacebookProvider;
        const Like = this.state.Like;
        const social = this.state.social === true;
        return (
            social?
                <FacebookProvider appId={socialApps.fb.appId}>
                    <Like href={window.location.href.replace('@', '&#064;')} colorScheme="dark" showFaces share layout="button_count"/>
                </FacebookProvider>
            :
                ''
        );
    }
}

export default FBLike;