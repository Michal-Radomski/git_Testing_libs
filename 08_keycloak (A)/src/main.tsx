import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";

import App from "./App.tsx";

const oidcConfig = {
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: window.location.origin,
  // response_type: "code", // or 'id_token token' depending on your flow
  // scope: "openid profile email", // scopes you want
  // // silent_redirect_uri: window.location.origin + "/silent-renew.html", // for silent renew
  // automaticSilentRenew: true, // enable automatic token renewal
};

createRoot(document.getElementById("root") as HTMLDivElement).render(
  // <React.StrictMode>
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
  // </React.StrictMode>
);
