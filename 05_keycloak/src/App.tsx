import React from "react";
import { useKeycloak } from "@react-keycloak/web";
// import { useNavigate } from "react-router-dom";

// const generateRandomString = (length: number) => {
//   return Math.random()
//     .toString(36)
//     .substring(2, length + 2);
// };

const App = (): JSX.Element => {
  const { keycloak } = useKeycloak();
  // const navigate = useNavigate();

  React.useEffect(() => {
    if (keycloak) {
      console.log("keycloak:", keycloak);
      const isAuth = keycloak?.authenticated;
      console.log({ isAuth });
      // const state = generateRandomString(16);
      // const nonce = generateRandomString(16);
      // console.log({ state, nonce });

      // const redirectUrl = `http://localhost:8080/realms/master/protocol/openid-connect/auth?response_type=code&client_id=05_keycloak&redirect_uri=${encodeURIComponent(
      //   "http://localhost:3000"
      // )}&state=${state}&nonce=${nonce}`;
    }
  }, []);

  return (
    <React.Fragment>
      App
      <button onClick={() => keycloak?.login()}>Login</button>
      <button onClick={() => keycloak?.logout()}>Logout</button>
    </React.Fragment>
  );
};

export default App;
