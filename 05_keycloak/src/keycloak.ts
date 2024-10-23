import Keycloak, { KeycloakConfig } from "keycloak-js";

const realm = import.meta.env.VITE_Keycloak_realm as string;
const url = import.meta.env.VITE_Keycloak_url as string;
const clientId = import.meta.env.VITE_Keycloak_clientId as string;
// console.log({ realm, url, clientId });

const initOptions = {
  url: url,
  realm: realm,
  clientId: clientId,
  onLoad: "check-sso", // check-sso | login-required
  KeycloakResponseType: "code",
} as KeycloakConfig;

const keycloak = new Keycloak(initOptions);

export default keycloak;
