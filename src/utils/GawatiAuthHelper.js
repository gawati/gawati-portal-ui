import Keycloak from 'keycloak-js';
import keycloakJson from '../configs/keycloak.json';

export default class GawatiAuthHelper{


    static isUserLoggedIn = function(){
	    return localStorage.getItem('authenticated')==='true';
	}

	static getUserName = function(){
		return localStorage.getItem('username');
	}

	static login = function(){
		const kc = Keycloak(keycloakJson);
	    kc.init();
	    kc.login();
	}

	static register = function(){
		const kc = Keycloak(keycloakJson);
	    kc.init();
	    kc.register();
	}

	static logout = function(){
	    const kc = Keycloak(keycloakJson);
	    kc.init();
	    localStorage.setItem('authenticated', 'false');
	    localStorage.setItem('username', 'guest');
	    kc.logout();
	}

	static save = function(callback){
	    const kc = Keycloak(keycloakJson);
        kc.init().success(function(authenticated) {
            if(authenticated){
                localStorage.setItem('authenticated', 'true');
                kc.loadUserProfile().success(function(profile) {
                    localStorage.setItem('username', profile.username);
                    callback(true);
                }).error(function() {
                    localStorage.setItem('username', 'guest');
                    callback(false);
                });
            }else{
                localStorage.setItem('authenticated', 'false');
                localStorage.setItem('username', 'guest');
                callback(false);
            }
        }).error(function(error) {
            alert('failed to initialize'+error);
            callback(false);
        })
	} 
}
