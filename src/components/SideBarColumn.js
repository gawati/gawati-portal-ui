import React from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";

import { ToastContainer, toast } from 'react-toastify';
import { Form, Input } from 'reactstrap';
import Swipeable from 'react-swipeable';

import {apiGetCall} from '../api';
import Filter from '../containers/filter/Filter2';
import {isAuthEnabled} from '../utils/generalhelper';
import { getUserInfo, getToken } from '../utils/GawatiAuthClient';
import {convertEncodedStringToObject, getRoute} from '../utils/routeshelper';
import {xQueryFilterBuilder} from '../utils/xqueryhelper';
import {T} from '../utils/i18nhelper';
import '../css/SideBarColumn.css';
import SaveSearchAutoComplete from '../containers/SaveSearchAutoComplete';

class SideBarColumn extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            save_name:'',
            username:'guest'
        };
        this.handleSubmitSave = this.handleSubmitSave.bind(this);
        this.handleSaveName = this.handleSaveName.bind(this);
    }

    convertRoutePropToXQuery = (paramQ) => 
        xQueryFilterBuilder(convertEncodedStringToObject(paramQ)).join('');

    componentDidMount() {
        if (isAuthEnabled()) {
            if (getToken() != null) {
                getUserInfo()
                .success( (data) => {
                    console.log(" getUserName (data) = ", data);
                    this.setState({username: data.preferred_username});
                })
                .error( (err) => {
                    this.setState({username: "guest"});
                    console.log(" getUserName (err) = ", err);
                });
            }
        }
        
    }

    handleLeftSwipe() {
        if (this.props.flexDirection === "row-reverse") {
            this.props.slideToggle();
        }
    }

    handleRightSwipe() {
        if (this.props.flexDirection === "row") {
            this.props.slideToggle();
        }
    }

    handleSubmitSave = (event) =>{
        event.preventDefault();
        let apiSaveSearch = apiGetCall(
            'save-search-name', {}
        );
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        if(Object.keys(query).length === 0 && query.constructor === Object){
            toast.error("There is no filter in search");
            return;
        }

        if(this.state.save_name===''){
            toast.error("Name can not be empty");
            return;
        }
        axios.post(apiSaveSearch, {
            searchName: this.state.save_name,
            userName: this.state.username,
            data: JSON.stringify({query: query, count: this.state.count, from: this.state.from, to: this.state.to, lang:this.state.lang})
        })
        .then(response => {
            if(response.data.success==="true"){
                toast.success("Search saved successfully");
            }else if(response.data.error!==undefined){
                toast.error(response.data.data.message);
            }else{
                toast.error("There is some problem. Kindly try again");
            }
        })
        .catch(function(error) {
            console.log('There is some error' + error);
            toast.error("There is some problem. Kindly try again");
        });
    } 

    handleSaveName = (event) =>{
        this.setState({save_name: event.target.value});
    }    

    renderSaveModal = () =>{
        return (
            <Popup
                trigger={ <a className="pointer" onClick={this.toggleSaveModal}><i className="fa fa-floppy-o" />&#160;Save</a> }
                position="bottom center"
                on="hover"
                closeOnDocumentClick
            >
                <div className="full-width">
                    <div className="header center">Save your search</div><hr className="search-line"></hr>
                    <div className="content">
                        <Form onSubmit={this.handleSubmitSave}>
                            <div className="row">
                                <Input type="text" value={this.state.save_name} placeholder="search name" autoFocus onChange={this.handleSaveName} bsSize="sm" />
                            </div>
                            <input type="submit" value="Save" color="primary" className="btn btn-primary btn-sm right" />
                        </Form>
                    </div>
                </div>
            </Popup>
        );
    }

    renderSearchModal = () =>{
        return (
            <Popup
                trigger={ <a className="pointer">&#160;<i className="fa fa-search" />&#160;Search</a> }
                position="bottom center"
                on="hover"
                closeOnDocumentClick
            >
                <div className="full-width">
                    <div className="header center">Search from saved searches</div><hr className="search-line"></hr>
                    <div className="content">
                        <SaveSearchAutoComplete  lang="eng"/>
                    </div>
                </div>
            </Popup>
        );
    }

    renderSaveSearchModal = (match) =>{
        console.log('init');
        console.log(match);
        if(this.state.username==="guest"){
            return (
                <div className="save-search-container">
                    register/ login to save searches
                </div
                >);
        }else{
            let content;
            if(getRoute("doc-iri")===match.path || (getRoute("recent")===match.path && match.params.from==="1" && match.params.q===undefined) || "/_lang/:lang"===match.path){
                let search_modal_content = this.renderSearchModal();
                content = 
                <div className="save-search-container">
                    {search_modal_content}
                </div>;
            }else{
                let save_modal_content = this.renderSaveModal();
                let search_modal_content = this.renderSearchModal();
                content = 
                <div className="save-search-container">
                    {save_modal_content} | {search_modal_content}
                </div>;
            }
            return content;
        }
    }

    render() {
        const {match, i18n} = this.props;
        let save_search_modal_content = this.renderSaveSearchModal(match);
        return (
            <Swipeable
                className="swipe"
                style={{ touchAction: 'none' }}
                onSwipedLeft={()=>this.handleLeftSwipe()}
                onSwipedRight={()=>this.handleRightSwipe()}
                >
                <div id="filter-container">
                    <ToastContainer />
                    <div className={ `sidebar-col col-3` } ref={this.props.setCollapsible}>
                        <div className={ `w-clearfix white-wrapper` }>
                            {save_search_modal_content}
                            <Filter match={ match } i18n={ i18n }/>
                            <p className="cc-law-libray">{T("The African Law Library")}</p>
                        </div>
                    </div>
                </div>
            </Swipeable>
        );
    }
}

export default SideBarColumn;

