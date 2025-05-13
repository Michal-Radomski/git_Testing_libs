Here's an example illustrating how to implement a **login flow in a React SPA using Authorization Code Flow with PKCE**,
where the frontend initiates the login and the backend performs the token exchange securely with Keycloak holding client
credentials.

---

## Overview

- **Frontend (React SPA):**

  - Generates PKCE code verifier and code challenge.
  - Redirects user to Keycloak authorization endpoint with `code_challenge`.
  - Receives authorization code on redirect callback.
  - Sends authorization code and code verifier to your backend API.

- **Backend (Express API):**
  - Receives authorization code and code verifier from frontend.
  - Exchanges authorization code for tokens with Keycloak token endpoint, authenticating with client credentials (client ID +
    secret).
  - Returns tokens (or session info) to frontend securely.

---

## Example Code

### 1. Frontend React (simplified)

```tsx
import React, { useEffect } from "react";

function base64UrlEncode(str: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest("SHA-256", data);
}

function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array.buffer);
}

async function generateCodeChallenge(codeVerifier: string) {
  const hashed = await sha256(codeVerifier);
  return base64UrlEncode(hashed);
}

const keycloakAuthUrl = "http://localhost:8080/realms/myrealm/protocol/openid-connect/auth";
const clientId = "my-client";
const redirectUri = "http://localhost:3000/callback";

export default function Login() {
  useEffect(() => {
    // Check if redirected back with code
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      // Get stored code_verifier
      const codeVerifier = sessionStorage.getItem("pkce_code_verifier");
      if (!codeVerifier) {
        console.error("Code verifier not found");
        return;
      }
      // Send code and verifier to backend to exchange tokens
      fetch("http://localhost:4000/api/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code, codeVerifier, redirectUri }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Logged in, tokens:", data);
          // Handle login success (store tokens, update UI, etc.)
        });
    }
  }, []);

  const login = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    sessionStorage.setItem("pkce_code_verifier", codeVerifier);

    const authUrl = `${keycloakAuthUrl}?response_type=code&client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=openid profile email` +
      `&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    window.location.href = authUrl;
  };

  return Login with Keycloak;
}
```

---

### 2. Backend Express API (token exchange)

```js
// server.js (Express)
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const tokenEndpoint = "http://localhost:8080/realms/myrealm/protocol/openid-connect/token";
const clientId = "my-client";
const clientSecret = "your-client-secret";

app.post("/api/auth/callback", async (req, res) => {
  const { code, codeVerifier, redirectUri } = req.body;

  if (!code || !codeVerifier || !redirectUri) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
  params.append("code", code);
  params.append("code_verifier", codeVerifier);
  params.append("redirect_uri", redirectUri);

  try {
    const tokenResponse = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      return res.status(500).json({ error });
    }

    const tokens = await tokenResponse.json();

    // Optionally set tokens in secure HTTP-only cookies here

    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log("API server listening on http://localhost:4000");
});
```

---

## Explanation

- The **frontend** generates a cryptographically random `code_verifier` and a corresponding `code_challenge` (SHA-256 hashed
  and base64-url-encoded).
- It stores the `code_verifier` temporarily in `sessionStorage`.
- It redirects the user to Keycloak’s authorization endpoint with the `code_challenge` and other parameters.
- After user login, Keycloak redirects back with an authorization `code`.
- The frontend sends the `code` and `code_verifier` to your backend.
- The **backend** calls Keycloak’s token endpoint with the authorization `code`, `code_verifier`, and client credentials
  (`client_id` and `client_secret`) to securely exchange the code for tokens.
- The backend returns tokens to the frontend or sets secure cookies for session management.

---

## Notes

- Your Keycloak client must be configured as **confidential** with client authentication enabled.
- The backend holds the client secret securely; frontend never exposes it.
- Redirect URIs must be registered in Keycloak client settings.
- Use HTTPS in production.
- You can extend this flow to store tokens in HttpOnly cookies for better security.

---

This pattern matches best practices for SPAs using Authorization Code Flow with PKCE and backend token exchange when client
authentication is required[1][2][3][4][5].

Citations: [1] https://github.com/avergnaud/keycloak-pkce-react [2]
https://skycloak.io/blog/keycloak-how-to-create-a-pkce-authorization-flow-client/ [3]
https://stackoverflow.com/questions/65277481/how-implement-react-spa-authentication-with-keycloak-and-pkce-flow [4]
https://rene-wilby.de/en/blog/rn-expo-oauth-authorization-code-flow-pkce-keycloak/ [5]
https://stackoverflow.com/questions/74120967/reactjs-keycloak-pkce-sending-code-verifier-with-token-post-request-after-authen
[6] https://medium.hexadefence.com/securing-a-react-app-using-keycloak-ac0ee5dd4bfc [7]
https://www.youtube.com/watch?v=IW15Q68V50E [8]
https://github.com/rbrki07/rn-expo-oauth-authorization-code-flow-pkce-keycloak

---

Answer from Perplexity:
https://www.perplexity.ai/search/i-m-building-app-react-fronten-f9AIuo_QTW2mcH8CxAkCEA?utm_source=copy_output
