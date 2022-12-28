import React from 'react';
import {Outlet, Link } from 'react-router-dom';

//Component Imports
import {handleLogout} from '../components/keycloak/Common';
import keycloak from '../components/keycloak/myKeycloak';
import Header from '../components/Header';

export default function MainPage(){
	//Initialize KeyCloak
	function initKeycloak() {
		keycloak.init({
			onLoad: 'login-required',
			redirectUri: 'http://localhost:3000/home'
        }).success(function() {
			// intentionally blank as the user gets routed to the LoggedInPage
        }).error(function(error) {
			// intentionally blank as the user gets routed to the LoggedInPage
        }).catch(function() {
			// intentionally blank as the user gets routed to the LoggedInPage
        });
	}

	return (
		<div className='container vh-100 vw-100 d-flex flex-column'>
			<Header/>
			<nav className='d-flex h-100 border justify-content-center align-items-center'>
				<Link to="#" className="btn btn-primary"><span onClick={() => initKeycloak()}>Login</span></Link>
				<Link to="/home" className="btn btn-success mx-5">Spotify: HOME</Link>
				<Link to="#" className="btn btn-danger" onClick={() => handleLogout()}>Logout</Link>
			</nav>
			<Outlet />
		</div>
	  );
}
