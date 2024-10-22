import Keycloak from "keycloak-js";

const realm = import.meta.env.VITE_Keycloak_realm as string;
const url = import.meta.env.VITE_Keycloak_url as string;
const clientId = import.meta.env.VITE_Keycloak_clientId as string;
// console.log({ realm, url, clientId });

const keycloak = new Keycloak({
  url: url,
  realm: realm,
  clientId: clientId,
  // onLoad: 'check-sso', // check-sso | login-required
  // KeycloakResponseType: 'code',
});

export default keycloak;
