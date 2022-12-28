import { logoutUrl } from "./myKeycloak";

/************************************************************************
* Checks local storage if a keycloak object is stored.
************************************************************************/
function checkLocalStorage() {
		var localKC = localStorage.getItem('keycloakInfo');

		try {
			if (localKC !== undefined && localKC !== null) {
				localKC = JSON.parse(localKC);
				if (localKC.idTokenParsed === undefined || localKC.idTokenParsed === null) {
					return null;
				} else {
					return localKC;
				}
			} else {
				return null;
			}
		} catch (error) {
			return null;
		}
}



/*******************************************************************************
* Gets invoked when the user clicks the Logout button.  This does two things.
* 1. Clears local storage for 'keycloakInfo'
* 2. Invokes logout url
*******************************************************************************/
function handleLogout() {
	localStorage.removeItem('keycloakInfo');
	window.location.replace(logoutUrl);
}
	
export { checkLocalStorage, handleLogout};