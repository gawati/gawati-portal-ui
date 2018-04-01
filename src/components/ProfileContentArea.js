import React from 'react';
import axios from 'axios';

import EditableLabel from '../utils/inlineedit';

import {dataProxyServer} from '../constants';
import GawatiAuthHelper from '../utils/GawatiAuthHelper';

const ProfileContentInfo = ({field, value}) => {
    if(value!==undefined && value!==""){
        return (
            <div>
                {field} : {value}
            </div>
        );
    }else{
        return (
            <div></div>
        );
    }
}

class ProfileContentArea extends React.Component {

    constructor(props) {
        super(props);
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.state = {
            loading: true,
            firstName:'',
            lastName:'',
            userName:'',
            nickName:'',
            dpUrl:'',
            email:'',
        };
    }

    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

    handleChange(propertyName, event) {
        const profile = this.state.profile;
        profile[propertyName] = event.target.value;
        this.setState({ profile: profile });
    }

    _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut(text) {
        const url = dataProxyServer() +  '/usr/profiles';

        axios.post(url, {
            nickName: text,
            userName: this.state.userName
        })
        .then(response => {
            console.log(response);
        })
        .catch(function(error) {
            console.log('There is some error' + error);
        }); 
    }

    onImageChange(e){
        const url = dataProxyServer() +  'profiles';
        const file = e.target.files[0];
        const userName = this.state.userName;
        const formData = new FormData();
        formData.append('dpUrl',file);
        formData.set('userName',userName);

        axios({
            method: 'post',
            url: url,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    componentDidMount() {
        const url = dataProxyServer() +  '/usr/profiles';
        const profile  = GawatiAuthHelper.getProfile();
        const firstName = profile.firstName!==undefined ? profile.firstName : '';
        const lastName = profile.lastName!==undefined ? profile.lastName : '';
        const email = profile.email!==undefined ? profile.email : '';
        const userName = profile.username!==undefined ? profile.username : '';
        this.setState({ userName: userName});
        this.setState({ firstName: firstName});
        this.setState({ lastName: lastName});
        this.setState({ email: email});
        axios.get(url, {
            params:{   
                userName: userName
            }
        }) 
        .then(response => {
            this.setState({ nickName: response.data.data.nickName});
            this.setState({ dpUrl: response.data.data.dpUrl});
        })
        .catch(function(error) {
            console.log('There is some error' + error);
        }); 

    }


    render() {
        return (
            <div className="container-fluid">
                <div>
                    <h2>My Profile</h2>
                    <ProfileContentInfo field="First Name" value={this.state.firstName}/>
                    <ProfileContentInfo field="Last Name" value={this.state.lastName} />
                    <ProfileContentInfo field="User Name" value={this.state.userName} />
                    <ProfileContentInfo field="Email" value={this.state.email} />
                    <div className="row">Nick Name : <EditableLabel text={this.state.nickName}
                            labelClassName='nicknameClass'
                            inputClassName='nicknameClass'
                            inputWidth='200px'
                            inputHeight='25px'
                            inputMaxLength='1000'
                            onFocus={this._handleFocus}
                            onFocusOut={this._handleFocusOut}
                        />
                    </div>
                    <div><input type="file" onChange={this.onImageChange} /></div>
                </div>
            </div>
        );
    }
}

export default ProfileContentArea;