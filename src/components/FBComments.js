import React from 'react';
import socialApps from '../configs/social.json';
import { getUserProfile, getUserSettings } from '../utils/GawatiAuthClient';

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
        
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.lang !== this.state.lang) {
            this.setState({"lang": nextProps.lang});
        }
    }

    componentDidMount () {
        getUserProfile().success((data) => {
            getUserSettings(data.userName).then((response) =>{
                if (!response.data.data.socialMedia) {
                    // this.setState({'social': true});
                    // this.setState({'FacebookProvider': require('react-facebook').FacebookProvider});
                    // this.setState({'Comments': require('react-facebook').Comments});
                }
            });
        })
    }


    render () {
        let lang = null;
        const FacebookProvider = this.state.FacebookProvider;
        const Comments = this.state.Comments;
        const social = this.state.social === true;
        if (this.state && this.state.lang){
            lang = langMap[this.state.lang]
        }
        return (
            <div key={this.state.social} >
            {lang && social?
                <FacebookProvider appId={socialApps.fb.appId} language={lang}>
                    <Comments href={window.location.href.replace('@', '&#064;')} width="100%" />
                </FacebookProvider>
            :
              
            ''
            }
            </div>
        );
    }
}

export default FBComments;