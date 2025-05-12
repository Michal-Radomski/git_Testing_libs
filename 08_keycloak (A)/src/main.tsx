import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";

import App from "./App.tsx";
import { onSigninCallback, userManager } from "./config.ts";
import { ProtectedApp } from "./ProtectedApp.tsx";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
      <ProtectedApp>
        <App />
      </ProtectedApp>
    </AuthProvider>
  </React.StrictMode>
);
