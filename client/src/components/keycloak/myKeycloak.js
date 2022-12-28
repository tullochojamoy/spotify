import Keycloak from "keycloak-js";

const ISSERVER = typeof window === 'undefined';

let keycloak;
if(!ISSERVER) {
  keycloak = new Keycloak({
    "realm": "demo",
    "authServerUrl": "http://localhost:8080/",
    "clientId": "js-console",
    "resource": "js-console",
    "publicClient": true,
    "url": "http://localhost:8080/",
    "confidentialPort": 0
  });
}

export const logoutUrl='http://localhost:8080/realms/demo/protocol/openid-connect/logout';

export default keycloak;