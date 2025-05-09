import React from "react";
import { useAuth, type AuthContextProps } from "react-oidc-context";

import "./App.scss";

const App: React.FC = () => {
  const auth: AuthContextProps = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        Welcome, {auth.user?.profile.preferred_username}!<button onClick={() => auth.removeUser()}>Logout</button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <button onClick={() => auth.signinRedirect()}>Login</button>
    </React.Fragment>
  );
};

export default App;
