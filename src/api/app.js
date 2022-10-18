import express from "express";
import cors from "cors";
import { createServer } from "http";

import { AppError } from "../errors/AppError";
import router from "../routes";
import { makeConnection } from "../database/conn";
import { startInstanceSocket } from "../socket";

const app = express();
app.use(express.json());
app.use(cors());

makeConnection();

app.use(router);

app.get("/hello", (req, res) => {
   return res.status(200).send("Hello World!");
});

app.use((err, req, res, _) => {
   if (err instanceof AppError) {
      return res.status(err.statusCode).json({
         message: err.message,
      });
   }

   return res.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
   });
});

const server = createServer(app);
startInstanceSocket(server);

export default server;
