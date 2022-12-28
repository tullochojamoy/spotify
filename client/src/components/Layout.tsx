import React, { useEffect, useState }  from 'react';

import Header from './Header';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';

import {checkLocalStorage, handleLogout} from './keycloak/Common.js';
import keycloak from './keycloak/myKeycloak.js';

const Layout = (props: any) => {
	const initialState = {
		usersName: '',
		logoutUrl: props.logoutUrl
	};

	const { children, logoutUrl } = props;
	const [active,setActive] = useState('');
	const [state, setState] = useState(initialState);

	function setStateCallBack (saveData: any) {
		if ( saveData) { 
			localStorage.setItem('keycloakInfo', JSON.stringify(keycloak));
		} else {
			localStorage.removeItem('keycloakInfo');
		}
	}

useEffect(()=> {
	var localKC = checkLocalStorage();
	if (localKC !== null && localKC !== undefined) {
		setState({usersName: localKC.idTokenParsed.name});
		return;
	}

	// check if user refreshed the page or not.
	if (window.performance) {
	  if (performance.navigation.type == 1) {
		keycloak.init({
			onLoad: 'login-required',
			enableLogging: true, 
			redirectUri: 'http://localhost:3000/home'
		}).then(function(authenticated) {
			 if (!authenticated) {
				 // if user still not authenticated then re-routes user to the main page.
				 window.location.replace('http://localhost:3000/');
			 } else {
				 // if authenticated then will reload the users data and updates the token.
				reloadData();
			 }
		}).catch(function() {
			console.log('check sso called.  Error occurred');
		});
	  } else {
		handleLoad();
	  }
	}

	return () => {
		window.removeEventListener('load', unhandleLoad);
	}
}, []);


function handleLoad() {
	if (keycloak.authenticated === true) {
		reloadData();
		setState({usersName: keycloak.idTokenParsed.name}, setStateCallBack(true));
	} else {
		keycloak.init({
			onLoad: 'login-required',
			enableLogging: true, 
			silentCheckSsoRedirectUri: 'http://localhost:3000/home'
		}).then(function(authenticated) {
			console.log('[LoggedInPage] handleLoad() -> check-sso authenticated: ' + authenticated);

			if (authenticated) {
				reloadData();
				setState({usersName: keycloak.idTokenParsed.name}, setStateCallBack(true));
			} else {
				setState({usersName: ''}, setStateCallBack(false));
				handleLogout(state.logoutUrl);
			}
		}).catch(function() {
			//console.log('[LoggedInPage] handleLoad() -> check-sso call failed.');
		});
	}
}

function unhandleLoad() {
	//console.log('[LoggedInPage] unloaded () -> called.');
}

function loadData () {
	if (keycloak.idToken) {
		setState({usersName: keycloak.idTokenParsed.name}, setStateCallBack(true));
	} else {
		keycloak.loadUserProfile(function() {
			setState({usersName: keycloak.profile.firstName + ' ' + keycloak.profile.lastName}, setStateCallBack(true));
		}, function() {
			//console.log('[LoggedInPage] loadData()-> Failed to retrieve user details. Please enable claims or account role');
		});
	}
}

function reloadData () {
	keycloak.updateToken(40)
	.success(loadData)
	.error(() => {
		console.log('[LoggedInPage] reloadData() ->Failed to load data.  User is logged out?? Clearing token and logging out.');
		keycloak.clearToken();
		keycloak.logout();
	});
}

// Retrieves users username from keycloak object.
const UserHTML = (state.usersName !== undefined ? state.usersName : 'no name' );



  return (
    <div className="main-container d-flex m-0 p-0 min-vh-100 overflow-hidden">
		<Navigation 
			active={active} 
			setActive={setActive} 
			logoutUrl={logoutUrl}
		/>

		<div className="content">
			<MobileNavigation setActive={setActive}/>
			<section className='dashboard-content'
			style={{overflowY: "scroll", maxHeight: "100vh"}}>
				<Header/>
				<div className="px-5">
				{children}
				</div>
			</section>
		</div>
    </div>
  )
}

export default Layout;