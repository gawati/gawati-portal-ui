import React from 'react';
import socialApps from '../configs/social.json';
import { defaultLang } from '../utils/generalhelper';

const langMap = {
    en: "en_US",
    fr: "fr_FR",
    pt: "pt_PT",
    ik: "en_US"
}


class FBComments extends React.Component {

    constructor (props) {
        super();
        this.state = {lang: props.lang};
        this.state.Comments = <span></span>;
        this.state.FacebookProvider = <span></span>;
        if (window.gawati.USER_SETTINGS_SOCIAL_MEDIA === true) {
            this.state.FacebookProvider = require('react-facebook').FacebookProvider;
            this.state.Comments = require('react-facebook').Comments;
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.lang !== this.state.lang) {
            this.setState({"lang": nextProps.lang});
        }
    }


    render () {
        let lang = langMap[defaultLang().langUI];
        const FacebookProvider = this.state.FacebookProvider;
        const Comments = this.state.Comments;
        const social = window.gawati.USER_SETTINGS_SOCIAL_MEDIA === true;
        if (this.state.lang){
            lang = langMap[this.state.lang]
        }
        return (
            social?
                <FacebookProvider appId={socialApps.fb.appId} language={lang}>
                    <Comments href={window.location.href.replace('@', '&#064;')} width="100%" />
                </FacebookProvider>
            :
                ''
        );
    }
}

export default FBComments;