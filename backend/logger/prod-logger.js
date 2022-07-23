import { format, createLogger, transports } from "winston";
const { timestamp, combine, errors, json } = format;
import CONFIG from "../../config.js";

export const buildProdLogger = () => {
  return createLogger({
    level: CONFIG.backend.logLevel,
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "dapp-backend" },
    transports: [new transports.Console()],
  });
};
