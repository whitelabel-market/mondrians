import express from "express";
import cors from "cors";
import authRouter from "./api/routes/auth.js";
import wlRouter from "./api/routes/whitelisting.js";
import createConfig from "./utils/config.js";
import { logger } from "./logger/index.js";

const app = express();

const startServer = async () => {
  const config = createConfig({
    app: {
      port: 3000,
    },
  });

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

  app.get("/status", (req, res) => {
    return res.status(200).json();
  });
  app.disable("x-powered-by");
  app.use(express.json());
  app.use(authRouter(config));
  app.use("/api/whitelist", wlRouter(config));

  app.listen(config.app.port, (err) => {
    if (err) {
      throw new Error(err);
    }
    logger.info(`Listening on port ${config.app.port}`);
  });
};

startServer();
