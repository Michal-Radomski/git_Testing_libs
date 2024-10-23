import React from "react";
import { Navigate, PathRouteProps } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

interface PrivateRouteProps extends PathRouteProps {
  component: React.ComponentType<any>; // You can specify more specific props if needed
}

// PrivateRoute component to protect routes
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }): JSX.Element => {
  const { keycloak } = useKeycloak();

  return <React.Fragment>{keycloak.authenticated ? <Component {...rest} /> : <Navigate to="/" />}</React.Fragment>;
};

export default PrivateRoute;
