import React from "react";
import { Button } from "react-bootstrap";
import { useAuth, type AuthContextProps } from "react-oidc-context";

// import "./tc3Testing";
import "./App.scss";
import axios from "axios";
import { agenciesUrl } from "./secret";

const App = (): React.JSX.Element => {
  const auth: AuthContextProps = useAuth();
  // console.log("auth:", auth);

  const { user, isAuthenticated } = auth;
  // console.log("user:", user);

  const [accessToken, setAccessToken] = React.useState<string>("");

  React.useEffect(() => {
    (async function getData(): Promise<void> {
      await axios
        .get(agenciesUrl, {
          withCredentials: true,
          headers: {
            "content-type": "application/json",
            accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US",
          },
        })
        .then((response) => {
          console.log("Data:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })();
  }, []);

  React.useEffect(() => {
    if (user) {
      // console.log("user:", user);
      const { access_token } = user;
      // console.log("access_token:", access_token);
      setAccessToken(access_token);
    }
  }, [user]);

  React.useEffect(() => {
    if (accessToken) {
      // console.log("accessToken:", accessToken);

      (async function getTcData(): Promise<void> {
        const API_URL = import.meta.env.VITE_test_TC_endpoint as string;

        await axios
          .get(API_URL, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "content-type": "application/json",
              accept: "application/json, text/plain, */*",
              "Accept-Language": "en-US",
            },
          })
          .then((response) => {
            console.log("Data:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })();
    }
  }, [accessToken]);

  const logOut = (): void => {
    auth.signoutRedirect();
  };

  const requestStorageAccessIfNeeded = async (): Promise<void> => {
    if (document.requestStorageAccess) {
      console.log("requestStorageAccess");
      try {
        await document.requestStorageAccess();
        console.log("Storage access granted");
      } catch (err) {
        console.warn("Storage access denied", err);
      }
    }
  };

  const logIn = (): void => {
    (async function login(): Promise<void> {
      await requestStorageAccessIfNeeded();
      await auth.signinRedirect();
    })();
  };

  return (
    <React.Fragment>
      {user && isAuthenticated ? (
        <Button variant="success" onClick={logOut}>
          Logout
        </Button>
      ) : (
        <Button variant="primary" onClick={logIn}>
          Login
        </Button>
      )}

      <br />

      {user && isAuthenticated ? <p>Private Content</p> : <p>Not Authorized</p>}
    </React.Fragment>
  );
};

export default App;
