import React from "react";
import axios from "axios";

const CreateUser2 = (): JSX.Element => {
  async function createUser(user: { [key: string]: string }) {
    try {
      const response = await axios.post("/api/create-user", user, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        console.log("response.data:", response.data);
      } else {
        console.log("response.status:", response.status);
      }
    } catch (error) {
      console.log("error:", error);
      if (error instanceof Error) {
        console.log("error.message:", error.message);
      }
    }
  }

  const newUserData = {
    username: "JohnDoe",
    email: "test10@test.com.pl",
    firstName: "John",
    lastName: "Doe",
    password: "password",
  };

  return (
    <React.Fragment>
      CreateUser2
      <button onClick={() => createUser(newUserData)}>Create User</button>
    </React.Fragment>
  );
};

export default CreateUser2;
