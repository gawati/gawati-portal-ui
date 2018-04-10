import Keycloak from 'keycloak-js';
import axios from 'axios';
import {apiGetCall} from '../api';
import keycloakJson from '../configs/keycloak.json';

export default class GawatiAuthHelper{

    static init = function(){
 		if(window.gawati.KC === undefined){
			 return axios.get(apiGetCall('keycloak', {})).then(response => {
				 window.gawati.KC = Keycloak(response.data);
			 })
	} else {;
			 return Promise.resolve(true);
		 }
 	}

    static isUserLoggedIn = function(){
	    return localStorage.getItem('KC_authenticated')==='true';
	}

	static getUserName = function(){
		var username = localStorage.getItem('KC_username');
		username = username===undefined ? 'guest' : username;
		return username;
	}

	static login = function(){
		this.init().then(() => {
			window.gawati.KC.init();
	    window.gawati.KC.login();
		}).catch((e) => {
			console.log(e);
		});
	}

	static register = function(){
		this.init().then(() => {
			window.gawati.KC.init();
	    window.gawati.KC.register();
		}).catch((e) => {
			console.log(e);
		});
	}

	static logout = function(){
		this.init().then(() => {
			window.gawati.KC.init();
			localStorage.setItem('KC_authenticated', 'false');
			localStorage.setItem('KC_username', 'guest');
			window.gawati.KC.logout();
		}).catch((e) => {
			console.log(e);
		});
	}

	static save = function(callback){
		this.init().then(() => {
			window.gawati.KC.init().success(function(authenticated) {
				if(authenticated){
					localStorage.setItem('KC_authenticated', 'true');
					window.gawati.KC.loadUserProfile().success(function(profile) {
						localStorage.setItem('KC_username', profile.username);
						callback(true);
					}).error(function() {
						localStorage.setItem('KC_username', 'guest');
						callback(false);
					});
				}else{
					localStorage.setItem('KC_authenticated', 'false');
					localStorage.setItem('KC_username', 'guest');
					callback(false);
				}
			}).error(function(error) {
				alert('failed to initialize'+error);
				callback(false);
			})
		}).catch((e) => {
			console.log(e);
		});
	}

	static getToken = function(callback){
		this.init().then(() => {
			window.gawati.KC.updateToken(5).success(function(refreshed) {
				callback(window.gawati.KC.token);
			}).error(function() {
				callback(false);
			});
		}).catch((e) => {
			console.log(e);
		});
	}

	static hasRealmRole = function(role){
		this.init().then(() => {
			return window.gawati.KC.hasRealmRole(role);
		}).catch((e) => {
			console.log(e);
		});
	}

	static hasResourceRole = function(role, resource){
		this.init().then(() => {
			return window.gawati.KC.hasResourceRole(role, resource);
		}).catch((e) => {
			console.log(e);
		});
	}
}
