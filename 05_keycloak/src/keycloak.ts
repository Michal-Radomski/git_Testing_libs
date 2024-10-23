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

// keycloak
//   .init({
//     // @ts-ignore
//     onLoad: initOptions.onLoad,
//     // @ts-ignore
//     KeycloakResponseType: "code",
//     silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
//     checkLoginIframe: false,
//     pkceMethod: "S256",
//   })
//   .then(
//     (auth) => {
//       if (!auth) {
//         window.location.reload();
//       } else {
//         console.info("Authenticated");
//         console.log("auth", auth);
//         console.log("Keycloak", keycloak);
//         keycloak.onTokenExpired = () => {
//           console.log("token expired");
//         };
//       }
//     },
//     () => {
//       console.error("Authenticated Failed");
//     }
//   );

export default keycloak;
