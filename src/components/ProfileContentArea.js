import React from 'react';
import axios from 'axios';

import EditableLabel from '../commons/editable_label';

import {dataProxyServer} from '../constants';
import GawatiAuthHelper from '../utils/GawatiAuthHelper';
import {apiGetCall} from '../api';
import { ToastContainer, toast } from 'react-toastify';

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
        this.nickNameFocus = this.nickNameFocus.bind(this);
        this.nickNameFocusOut = this.nickNameFocusOut.bind(this);
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

    nickNameFocus(text) {
        console.log('Focused with text: ' + text);
    }

    nickNameFocusOut(text) {

    	let apiProfile = apiGetCall(
            'profile', {}
        );

        axios.post(apiProfile, {
            nickName: text,
            userName: this.state.userName
        })
        .then(response => {
            console.log(response);
            toast("Nickname updated successfully");
        })
        .catch(function(error) {
            console.log('There is some error' + error);
            toast("There is some problem. Kindly try again");
        }); 
    }

    onImageChange(e){

    	let apiProfile = apiGetCall(
            'profile', {}
        );

        let file = e.target.files[0];
        let userName = this.state.userName;
        let formData = new FormData();
        formData.append('dpUrl',file);
        formData.set('userName',userName);

        axios({
            method: 'post',
            url: apiProfile,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                //handle success
                console.log(response);
                toast("Photo updated successfully");
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                toast("There is some problem. Kindly try again");
            });
    }

    componentDidMount() {
        
    	let apiProfile = apiGetCall(
            'profile', {}
        );

        let profile  = GawatiAuthHelper.getProfile();
        let firstName = profile.firstName!==undefined ? profile.firstName : '';
        let lastName = profile.lastName!==undefined ? profile.lastName : '';
        let email = profile.email!==undefined ? profile.email : '';
        let userName = profile.username!==undefined ? profile.username : '';
        this.setState({ userName: userName, firstName: firstName, lastName: lastName, email: email});
        
        axios.get(apiProfile, {
            params:{   
                userName: userName
            }
        }) 
        .then(response => {
            this.setState({ nickName: response.data.data.nickName, dpUrl: response.data.data.dpUrl});
        })
        .catch(function(error) {
            console.log('There is some error' + error);
        }); 

    }


    render() {
        return (
            <div className="container-fluid">
            	<ToastContainer />
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
                            onFocus={this.nickNameFocus}
                            onFocusOut={this.nickNameFocusOut}
                        />
                    </div>
                    <div><input type="file" onChange={this.onImageChange} /></div>
                </div>
            </div>
        );
    }
}

export default ProfileContentArea;