import express, { Router, Request, Response } from "express";
import axios from "axios";

import { getAdminToken } from "./utils";

// type CustomError = {
//   error: string;
// };

const indexRouter: Router = express.Router({ strict: false, caseSensitive: true });

indexRouter.post("/create-user", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);

  try {
    const token: string = await getAdminToken();
    // console.log("token:", token);

    const newUserData = {
      email: "test13@test.com.pl",
      enabled: true,
      emailVerified: true,
      firstName: "John",
      lastName: "Doe",
      credentials: [
        {
          type: "password",
          value: process.env.VITE_NEW_USER_PASSWORD,
          temporary: false,
        },
      ],
    };

    const response = await axios.post(process.env.VITE_USERS_URL as string, newUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("response:", response);
    if (response.status === 201) {
      console.log("response.status, response.statusText:", response.status, response.statusText);
      res
        .status(201)
        .json({ message: `User created successfully, Status: ${response.status}, StatusText: ${response.statusText}` });
    } else {
      console.log("response?.status:", response?.status);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
});

// indexRouter.get("/auth-well-known-config", async (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   const url = process.env.wellKnown as string;
//   console.log({ url });

//   try {
//     const response = await axios.get(url, {
//       headers: { accept: "application/json" },
//     });

//     console.log("data:", response.data);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: String(error) } satisfies CustomError);
//   }
// });

export default indexRouter;
