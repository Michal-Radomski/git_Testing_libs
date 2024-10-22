import React from "react";
import { useKeycloak } from "@react-keycloak/web";

const App = (): JSX.Element => {
  const { keycloak } = useKeycloak();

  console.log("keycloak:", keycloak);
  return <React.Fragment>App</React.Fragment>;
};

export default App;
