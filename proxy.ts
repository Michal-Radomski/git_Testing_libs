import http from "http";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import axios from "axios";

// The server
const app: Express = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

//* Test route
// app.get("/", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// });

app.all("/", (req: Request, res: Response) => {
  const { target, method } = req.body;
  // console.log("target:", target);
  console.log({ method });

  try {
    axios
      .get(target)
      .then((response) => {
        if (response?.status === 200) {
          const dataToSend = response?.data;
          // console.log("dataToSend:", dataToSend);
          method === "send" ? res.status(200).send(dataToSend) : res.status(200).json(dataToSend);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("error.response.status:", error.response.status);
        }
      });
  } catch (err) {
    console.error("Error:", err);
    res.statusCode = 400;
    res.end("Bad Request");
  }
});

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
