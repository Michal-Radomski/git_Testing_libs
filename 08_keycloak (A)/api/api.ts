import path from "path";
import http from "http";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import session from "express-session";
import KeycloakConnect from "keycloak-connect";

import { keycloakConfig } from "./keycloakConfig";

//* The server
const app: Express = express();

const corsOptions = {
  origin: true,
  methods: ["POST", "GET", "OPTIONS"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Specify
};

//* Keycloak
const memoryStore: session.MemoryStore = new session.MemoryStore();
const keycloak = new KeycloakConnect({ store: memoryStore }, keycloakConfig);
app.use(
  session({
    secret: process.env.password as string,
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(keycloak.middleware());

//* Middlewares
app.use(cors(corsOptions));
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
// Compress all responses
app.use(compression({ level: 6 }));

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "./../public/favicon.svg"));
});
//* Test route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

//* Port
const portHTTP = (process.env.PORT || 5000) as number;

const httpServer = http.createServer(app);
httpServer.listen({ port: portHTTP }, () => {
  console.log(`🚀 Server is listening at http://localhost:${portHTTP}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

console.log("process.env.NODE_ENV:", process.env.NODE_ENV);

//* Generate JWT secret string
// const JWT_Secret = require("crypto").randomBytes(48).toString("hex");
// console.log({ JWT_Secret }, JWT_Secret.length);

//* Generate JWT secret string - V2 -> console!
// openssl rand -hex 64
