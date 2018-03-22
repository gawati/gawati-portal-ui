import Keycloak from 'keycloak-js';
import keycloakJson from '../configs/keycloak.json';

export default class GawatiAuthHelper{

    static init = function(){
 		if(window.GawatiAuthHelperKeycloak === undefined){
 			window.GawatiAuthHelperKeycloak = Keycloak(keycloakJson);
 		}
 	}

    static isUserLoggedIn = function(){
	    return localStorage.getItem('KC_authenticated')==='true';
	}

	static getUserName = function(){
		return localStorage.getItem('KC_username');
	}

	static login = function(){
		this.init();
	    window.GawatiAuthHelperKeycloak.login();
	}

	static register = function(){
		this.init();
	    window.GawatiAuthHelperKeycloak.register();
	}

	static logout = function(){
		this.init();
		window.GawatiAuthHelperKeycloak.init();
	    localStorage.setItem('KC_authenticated', 'false');
	    localStorage.setItem('KC_username', 'guest');
	    window.GawatiAuthHelperKeycloak.logout();
	}

	static save = function(callback){
		this.init();
	    window.GawatiAuthHelperKeycloak.init().success(function(authenticated) {
            if(authenticated){
            	localStorage.setItem('KC_authenticated', 'true');
                window.GawatiAuthHelperKeycloak.loadUserProfile().success(function(profile) {
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
	}

	static getToken = function(callback){
		this.init();
		window.GawatiAuthHelperKeycloak.updateToken(5).success(function(refreshed) {
	        callback(window.GawatiAuthHelperKeycloak.token);
	    }).error(function() {
	        callback(false);
	    });
	}

	static hasRealmRole = function(role){
		this.init();
		return window.GawatiAuthHelperKeycloak.hasRealmRole(role);
	}

	static hasResourceRole = function(role, resource){
		this.init();
		return window.GawatiAuthHelperKeycloak.hasResourceRole(role, resource);
	}
}
