import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import Home from "./Home";

const App = (): JSX.Element => {
  const { keycloak } = useKeycloak();

  const [initialized, setInitialized] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (keycloak) {
      // console.log(keycloak?.didInitialize);
      setInitialized(keycloak?.didInitialize);
    }
  }, []);

  if (!initialized) {
    return <div>Loading...</div>; // Show loading indicator while initializing
  }

  return (
    <React.Fragment>
      App
      <br />
      {JSON.stringify(keycloak?.authenticated)}
      <br />
      <button onClick={() => keycloak?.login()}>Login</button>
      <button onClick={() => keycloak?.logout()}>Logout</button>
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <React.Fragment>
              <PrivateRoute component={Dashboard} />
            </React.Fragment>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
