import React from "react";
import { useKeycloak } from "@react-keycloak/web";

const Dashboard = (): JSX.Element => {
  const { keycloak } = useKeycloak();
  return (
    <React.Fragment>
      <div>
        <h1>Dashboard</h1>
        {keycloak.token && <p>Token: {keycloak.token}</p>}
        {keycloak.idToken && <p>ID Token: {keycloak.idToken}</p>}
        {keycloak.tokenParsed && (
          <div>
            <p>Name: {keycloak.tokenParsed.name}</p>
            <p>Email: {keycloak.tokenParsed.email}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
