import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const userManager = new UserManager({
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: `${window.location.origin}${window.location.pathname}`,
  post_logout_redirect_uri: window.location.origin,
  // userStore: undefined,
  monitorSession: true, // this allows cross tab login/logout detection
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  scope: "openid profile email",
  automaticSilentRenew: true,
  response_type: "code",
});

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};
