import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const userManager = new UserManager({
  authority: import.meta.env.VITE_PUBLIC_AUTHORITY as string,
  client_id: import.meta.env.VITE_PUBLIC_CLIENT_ID as string,
  redirect_uri: `${window.location.origin}`,
  // post_logout_redirect_uri: `${window.location.origin}${window.location.pathname}`,
  post_logout_redirect_uri: window.location.origin,
  monitorSession: false, // this allows cross tab login/logout detection - false w Chrome!, true w Firefox
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  scope: "openid profile email",
  automaticSilentRenew: true,
  response_type: "code",
  silent_redirect_uri: window.location.origin,
});

export const onSigninCallback = (): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};
