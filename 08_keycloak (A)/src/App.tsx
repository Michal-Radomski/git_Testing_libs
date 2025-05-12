import React from "react";
import { useAuth, type AuthContextProps } from "react-oidc-context";

import "./App.scss";

const App: React.FC = (): JSX.Element => {
  const auth: AuthContextProps = useAuth();

  return (
    <React.Fragment>
      Protected Content
      <br />
      <button onClick={() => auth?.signoutRedirect()}>LogOut</button>
    </React.Fragment>
  );
};

export default App;
