import express from "express";
import cors from "cors";
import authRouter from "./api/routes/auth.js";
import wlRouter from "./api/routes/whitelisting.js";
import printRouter from "./api/routes/print.js";
import createConfig from "./utils/config.js";
import { logger } from "./logger/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";
import CONFIG from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const startServer = async () => {
  const config = createConfig();

  const origin =
    process.env.NODE_ENV === "development"
      ? ["http://localhost:8080"]
      : config.authorization.trustedOrigins;

  app.use(
    cors({
      origin,
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
      credentials: true,
    })
  );

  app.use("/screenshots", (req, res, next) => {
    const { apikey } = req.query;
    if (!apikey) return res.status(403).send("Forbidden");
    if (apikey !== CONFIG.backend.apiKey)
      return res.status(403).send("Forbidden");
    return next();
  });

  app.use(
    "/screenshots",
    express.static(path.join(__dirname, "./screenshots"))
  );

  app.get("/status", (req, res) => {
    return res.status(200).json();
  });

  app.disable("x-powered-by");
  app.use(
    express.json({ type: ["application/json", "application/cloudevents+json"] })
  );
  app.use(cookieParser());
  app.use(authRouter(config));
  app.use("/api/print", printRouter(config));
  app.use("/api/whitelist", wlRouter(config));

  app.listen(CONFIG.backend.port, (err) => {
    if (err) {
      throw new Error(err);
    }
    logger.info(`Listening on port ${CONFIG.backend.port}`);
  });
};

startServer();
