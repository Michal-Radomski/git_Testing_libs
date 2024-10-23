import React from "react";
import ReactDOM from "react-dom/client";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import keycloak, { keycloakInitOptions } from "./keycloak.ts";
// console.log("keycloak:", keycloak);

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <Router>
    <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitOptions}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReactKeycloakProvider>
  </Router>
);
