export const keycloakConfig = {
  realm: process.env.keycloak_realm as string,
  "auth-server-url": process.env.auth_server as string,
  "ssl-required": "external",
  resource: process.env.VITE_CLIENT_ID as string,
  credentials: {
    secret: process.env.VITE_CLIENT_SECRET as string,
  },
  "confidential-port": 0,
};
