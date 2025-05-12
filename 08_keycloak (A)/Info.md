To manually implement login to Keycloak from a React app without using any Keycloak-specific library, you need to follow the
OpenID Connect (OIDC) authorization code flow (or implicit flow for simpler cases) by directly interacting with Keycloak’s
endpoints via standard HTTP requests and browser redirects.

Here is a high-level step-by-step approach:

## 1. Redirect user to Keycloak login page

Construct a URL to Keycloak’s authorization endpoint with the required query parameters and redirect the user’s browser
there. For example:

```
https:///realms//protocol/openid-connect/auth
  ?client_id=
  &redirect_uri=
  &response_type=code
  &scope=openid
  &state=
  &nonce=
```

- `client_id`: Your Keycloak client ID.
- `redirect_uri`: URL in your React app to which Keycloak will redirect after login.
- `response_type=code`: To use Authorization Code Flow.
- `scope=openid`: Required for OpenID Connect.
- `state` and `nonce`: Random strings for CSRF and replay protection.

In React, you can trigger this redirect on a button click:

```js
const login = () => {
  const keycloakAuthUrl = `https://keycloak.example.com/realms/myrealm/protocol/openid-connect/auth?client_id=myclient&redirect_uri=${encodeURIComponent(
    window.location.origin + "/callback"
  )}&response_type=code&scope=openid&state=xyz&nonce=abc`;
  window.location.href = keycloakAuthUrl;
};
```

## 2. Handle the redirect with authorization code

After successful login, Keycloak redirects back to your React app’s `redirect_uri` with a query parameter `code`
(authorization code) and `state`.

Your React app should have a route (e.g., `/callback`) that extracts the `code` from the URL.

## 3. Exchange authorization code for tokens

Your React app must send a POST request to Keycloak’s token endpoint to exchange the authorization code for an access token
(and optionally a refresh token and ID token).

Example POST request to:

```
https:///realms//protocol/openid-connect/token
```

with form data:

- `grant_type=authorization_code`
- `client_id=`
- `code=`
- `redirect_uri=`

If your client is confidential, you also need to send `client_secret`.

Example in JavaScript (using fetch):

```js
const exchangeCodeForToken = async (code) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "myclient");
  params.append("code", code);
  params.append("redirect_uri", window.location.origin + "/callback");

  const response = await fetch("https://keycloak.example.com/realms/myrealm/protocol/openid-connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Token exchange failed");
  }

  const data = await response.json();
  return data; // contains access_token, id_token, refresh_token, expires_in, etc.
};
```

## 4. Store tokens securely

Once you receive tokens, store them securely in memory or in browser storage (e.g., `sessionStorage` or `localStorage`),
depending on your security requirements.

## 5. Use access token to access protected resources

Send the access token as a Bearer token in the `Authorization` header when calling your backend or APIs.

## 6. Implement logout

To log out, redirect the user to Keycloak’s logout endpoint:

```
https:///realms//protocol/openid-connect/logout?redirect_uri=
```

## Important notes

- You must handle token expiration and refresh tokens if needed.
- For security, use Authorization Code Flow with PKCE if your client is public (frontend only).
- You need to configure your Keycloak client with the correct redirect URIs and CORS settings.
- This manual approach requires careful handling of security concerns, token storage, and error handling.

---

This approach is essentially what Keycloak’s JavaScript adapter libraries do under the hood but done manually in your React
app without any library[2][3].

If you want a concrete minimal example, the steps are:

1. On login button click, redirect to Keycloak auth URL.
2. On redirect back, parse `code` from URL.
3. POST to token endpoint to get tokens.
4. Store tokens and update UI accordingly.

This lets you fully control the login flow without using any Keycloak-specific React library.

Citations: [1] https://github.com/erbsutil/react-keycloak-auth [2]
https://blog.logrocket.com/implement-keycloak-authentication-react/ [3]
https://www.reddit.com/r/KeyCloak/comments/1dstul1/using_keycloak_to_authenticate_in_a_react/ [4]
https://www.youtube.com/watch?v=yUrfBrSkWLg [5]
https://medium.hexadefence.com/securing-a-react-app-using-keycloak-ac0ee5dd4bfc [6]
https://medium.com/scalac/user-authentication-with-keycloak-part-1-35295107acd [7]
https://scalac.io/blog/user-authentication-keycloak-1/ [8] https://www.keycloak.org/docs/latest/server_development/index.html

---

Answer from Perplexity:
https://www.perplexity.ai/search/using-react-with-keycloak-i-ha-oM0yLZ.uR0qOmwhvUfv8Qw?utm_source=copy_output

To add an Express API to your React app secured with Keycloak using the `react-oidc-context` library and enhance overall
security, you need to secure both the frontend and backend properly with Keycloak and OAuth2/OpenID Connect standards. Here's
a concise guide based on best practices and available resources:

## 1. Secure Your React Frontend with `react-oidc-context`

- You already use `react-oidc-context` to handle authentication in React via OpenID Connect (OIDC) with Keycloak.
- This library manages user login, token acquisition, and session management on the client side, ensuring the React app is
  protected and users are authenticated before accessing protected routes[6][8][10].

## 2. Add and Secure Your Express API Backend with Keycloak

**Setup Express with Keycloak Middleware:**

- Install Express and the Keycloak Node.js adapter.
- Use Express sessions with a memory store or another session store.
- Initialize Keycloak middleware with the session store.
- Protect your API routes by applying Keycloak middleware to enforce authentication and authorization.

Example setup snippet:

```js
const express = require("express");
const session = require("express-session");
const Keycloak = require("keycloak-connect");

const app = express();
const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "yourSecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

// Protect API route
app.get("/api/secure-data", keycloak.protect(), (req, res) => {
  res.json({ message: "This is a secured endpoint" });
});

app.listen(3000, () => console.log("API listening on port 3000"));
```

This setup ensures that only authenticated users with valid tokens can access your API endpoints[3].

**Configure Keycloak Client for API:**

- In Keycloak Admin Console, create a client representing your Express API.
- Set Access Type to `confidential` for secure client authentication.
- Configure valid redirect URIs and obtain the client secret.
- Use this client configuration in your Express app to validate tokens and manage authorization[5][7].

## 3. Token Validation and Role-Based Access Control (RBAC)

- Your Express API should verify the access token sent by the React frontend (usually in the Authorization header as a Bearer
  token).
- Use Keycloak’s middleware or JWT libraries to validate tokens.
- Implement role-based access control by checking user roles/permissions embedded in the token to restrict API access
  accordingly[2][7].

## 4. Additional Security Best Practices

- Use HTTPS for all communication between client, API, and Keycloak server to protect tokens and credentials in transit[9].
- Implement multi-factor authentication (MFA) in Keycloak for sensitive accounts[9].
- Regularly update Keycloak and dependencies to patch security vulnerabilities.
- Manage session expiry and token refresh securely both in React and Express[9][10].

---

### Summary

- Continue using `react-oidc-context` for React frontend authentication with Keycloak.
- Add an Express API secured by Keycloak middleware (`keycloak-connect`) to protect backend endpoints.
- Configure a confidential Keycloak client for your API with proper roles and permissions.
- Validate tokens and enforce RBAC in Express.
- Use HTTPS and consider MFA for stronger security.

This approach ensures your React app and Express API are both secured by Keycloak, providing a robust authentication and
authorization framework for your full stack application[1][2][3][5][6][7][9].

Citations: [1] https://www.keycloak.org/docs/25.0.6/securing_apps/index.html [2]
https://dev.to/haithamoumer/secure-your-rest-api-using-keycloak-role-based-access-control-3f96 [3]
https://www.keycloak.org/securing-apps/nodejs-adapter [4]
https://stackoverflow.com/questions/65009654/how-to-protect-frontend-and-rest-api-with-keycloak [5]
https://www.restack.io/p/designing-secure-user-interfaces-api-answer-secure-rest-api-keycloak [6]
https://www.wedaa.tech/docs/blog/2023/12/26/Intergating-keycloak-with-react-app [7]
https://www.ijert.org/api-security-protecting-apis-with-keycloak [8]
https://wedaa.tech/docs/blog/2023/12/26/Intergating-keycloak-with-react-app [9]
https://inero-software.com/best-keycloak-practices/ [10] https://betweendata.io/posts/react-keycloak-authentication/ [11]
https://www.youtube.com/watch?v=yUrfBrSkWLg

---

Answer from Perplexity:
https://www.perplexity.ai/search/i-have-keycloak-and-react-app-RhMOnPQqQJuO7Em6YbJcng?utm_source=copy_output
