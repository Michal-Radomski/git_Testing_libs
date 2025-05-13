import React from "react";
import axios from "axios";
import qs from "qs";

//* Not Working - CORS!
const CreateUser = (): JSX.Element => {
  const data = qs.stringify({
    client_id: import.meta.env.VITE_CLIENT_ID as string,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  const config = {
    method: "post",
    url: import.meta.env.VITE_KEYCLOAK_ADMIN_TOKEN_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  const newUserData = {
    email: "test6@test.com.pl",
    enabled: true,
    emailVerified: true,
    firstName: "user6",
    lastName: "Doe",
    credentials: [
      {
        type: "password",
        value: import.meta.env.VITE_NEW_USER_PASSWORD,
        temporary: false,
      },
    ],
  };

  const createUser = async (): Promise<void> => {
    await axios(config)
      //* Get Token
      .then((response) => {
        console.log("response.data:", response.data);
        const token = response.data?.access_token;
        console.log("token:", token);
        //* Create User
        axios
          .post(import.meta.env.VITE_USERS_URL, newUserData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("User created:", response.data);
          })
          .catch((error) => {
            console.error("Error creating user:", error.response ? error.response.data : error.message);
          });
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };

  return (
    <React.Fragment>
      CreateUser
      <button onClick={createUser}>Create User</button>
    </React.Fragment>
  );
};

export default CreateUser;
