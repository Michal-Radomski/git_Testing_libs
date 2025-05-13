import React from "react";
import { useAuth, type AuthContextProps } from "react-oidc-context";
import CreateUser from "./CreateUser";

interface ProtectedAppProps {
  children: React.ReactNode;
}

export const ProtectedApp: React.FC<ProtectedAppProps> = (props): React.JSX.Element => {
  const { children } = props;

  const auth: AuthContextProps = useAuth();

  if (auth.isLoading) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    );
  }

  if (auth.error) {
    return (
      <React.Fragment>
        <h1>We've hit a snag</h1>
        {auth.error?.message}
      </React.Fragment>
    );
  }
  if (!auth.isAuthenticated) {
    return (
      <React.Fragment>
        <h1>Sign In</h1>
        <button onClick={() => auth.signinRedirect()}>Login</button>
        <br />
        <CreateUser />
      </React.Fragment>
    );
  }
  return <React.Fragment>{children}</React.Fragment>;
};
