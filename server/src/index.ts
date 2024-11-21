import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./config/config";
import { CustomError } from "type";
import logging from "./config/logging";

import thoughtRoutes from "./routes/thought.routes";

const app = express();

const Main = () => {
  // Middleware
  app.use((req, res, next) => {
    // Log the Request
    logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
      // Log the Response
      logging.info(
        `Result -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });
  app.use(
    cors({
      credentials: true
    })
  );
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per window
  });
  app.use(limiter);

  // Routes
  app.use("/api", thoughtRoutes);

  // Healthcheck
  app.get("/main/healthcheck", (_, res: Response) => {
    res.status(200).json({ hello: "world!" });
  });
  // Error handling
  app.use((_, res: Response) => {
    const error = new Error("Route Not Found");
    console.log(error);
    res.status(404).json({ error: error.message });
  });

  app.use((error: CustomError, _req: Request, res: Response) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
  });

  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      app.listen(PORT, () => {
        logging.info(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

Main();
