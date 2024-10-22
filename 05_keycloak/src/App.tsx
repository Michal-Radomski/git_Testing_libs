import React from "react";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import Keycloak from "keycloak-js";

import "./App.scss";

const realm = import.meta.env.VITE_Keycloak_realm as string;
const url = import.meta.env.VITE_Keycloak_url as string;
const clientId = import.meta.env.VITE_Keycloak_clientId as string;
// console.log({ realm, url, clientId });

const keycloak = new Keycloak({
  url: url,
  realm: realm,
  clientId: clientId,
});

const App = (): JSX.Element => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <React.Fragment>
      <div>
        <p>Welcome, {keycloak.tokenParsed?.name}</p>
        <button onClick={() => keycloak.logout()}>Logout</button>
      </div>
    </React.Fragment>
  );
};

const WrappedApp = (): JSX.Element => (
  <ReactKeycloakProvider authClient={keycloak}>
    <App />
  </ReactKeycloakProvider>
);

export default WrappedApp;
