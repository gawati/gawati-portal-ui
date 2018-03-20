import Keycloak from 'keycloak-js';
import keycloakJson from '../configs/keycloak.json';

export default class GawatiAuthHelper{

 	static init = function(){
 		if(window.KC == undefined){
 			window.KC = Keycloak(keycloakJson);
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
	    window.KC.login();
	}

	static register = function(){
		this.init();
	    window.KC.register();
	}

	static logout = function(){
	    this.init();
	    window.KC.init();
	    localStorage.setItem('KC_authenticated', 'false');
	    localStorage.setItem('KC_username', 'guest');
	    window.KC.logout();
	}

	static save = function(callback){
	    this.init();
	    window.KC.init().success(function(authenticated) {
            if(authenticated){
            	localStorage.setItem('KC_authenticated', 'true');
                window.KC.loadUserProfile().success(function(profile) {
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
		window.KC.updateToken(5).success(function(refreshed) {
	        callback(window.KC.token);
	    }).error(function() {
	        callback(false);
	    });
	}

	static hasRealmRole = function(role){
		this.init();
		return window.KC.hasRealmRole(role);
	}

	static hasResourceRole = function(role, resource){
		this.init();
		return window.KC.hasRealmRole(role, resource);
	}
}
