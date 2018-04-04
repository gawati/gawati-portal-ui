import React from 'react';
import axios from 'axios';

import EditableLabel from '../commons/EditableLabel';

import GawatiAuthHelper from '../utils/GawatiAuthHelper';
import {apiGetCall} from '../api';
import { ToastContainer, toast } from 'react-toastify';
import { Col, FormGroup, Label, Input, FormText} from 'reactstrap';
import AvatarEditor from 'react-avatar-editor'

const ProfileContentInfo = ({label, value}) => {
    if(value!==undefined && value!==""){
        return (
            <FormGroup row>
                <Label for="label" sm={2}><b>{label}</b></Label>
                <Col sm={10}>
                    <Label for="label" >{value}</Label>
                </Col>
            </FormGroup>
        );
    }else{
        return (
            <FormGroup row>
            </FormGroup>
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
            if(response.data.success==="true"){
                toast("Nickname updated successfully");
            }else{
                toast("There is some problem. Kindly try again");
            }
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
        .then(response => {
            console.log(response);
            if(response.data.success==="true"){
                this.setState({dpUrl: response.data.data.dpUrl});
                toast("Photo updated successfully");
            }else{
                toast("There is some problem. Kindly try again");
            }
        })
        .catch(function(error) {
            console.log(error);
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
                    <FormGroup row>
                        <Label for="exampleFile" sm={2}><b>Profile Image</b></Label>
                        <Col sm={3}>
                            <AvatarEditor
                                image={this.state.dpUrl}
                                width={150}
                                height={150}
                                border={1}
                            />
                            <Input sm={3} type="file" name="file" id="imageFile" onChange={this.onImageChange}/>
                            <FormText color="muted">
                                Uppload new image to change the profile image.
                            </FormText>
                        </Col>
                    </FormGroup>
                    <ProfileContentInfo label="First Name" value={this.state.firstName}/>
                    <ProfileContentInfo label="Last Name" value={this.state.lastName} />
                    <ProfileContentInfo label="User Name" value={this.state.userName} />
                    <ProfileContentInfo label="Email" value={this.state.email} />
                    <EditableLabel text={this.state.nickName} label="Nick Name"
                        labelClassName='nicknameClass'
                        inputClassName='nicknameClass'
                        inputWidth='200px'
                        inputHeight='25px'
                        inputMaxLength='1000'
                        onFocus={this.nickNameFocus}
                        onFocusOut={this.nickNameFocusOut}
                    />
                </div>
            </div>
        );
    }
}

export default ProfileContentArea;