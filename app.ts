import express, { NextFunction, Request, Response, Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

import Logging from "./src/utils/logging";
import { MessageResponse } from "./src/utils/enum";
import { EmailRouter } from "./src/email/router";

const app: Express = express();

dotenv.config();

const port = process.env.PORT || 8080;

const StartServer = () => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    Logging.info(
      `Incoming ==> Method : [${req.method}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      // Log the Response
      Logging.info(
        `Incoming ==> Method : [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  // Cors
  app.use(
    cors({
      origin: ["https://fyndahmailer.vercel"],
      credentials: true,
      methods: ["POST"],
    })
  );

  // Routes
  app.use("/api/v1", EmailRouter);

  // Health check
  app.get("/api/v1/healthcheck", (_req: Request, res: Response) => {
    res.status(200).json({ status: "UP 🔥🔧🎂" });
  });

  // Invalid url error handling
  app.use((_req: Request, res: Response) => {
    const _error = new Error("Url not found 😟");

    Logging.error(_error);

    return res.status(404).json({ message: _error.message });
  });

  // Error middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err) {
      console.error(err);

      res.status(500).json({
        message: MessageResponse.Error,
        description: "Internal Server Error",
        data: null,
      });
    }
  });

  app.listen(port, () =>
    Logging.info(`Server is running on port ${port} 🔥🔧`)
  );
};

StartServer();