import { format, createLogger, transports } from "winston";
const { timestamp, combine, errors, json } = format;

export const buildProdLogger = () => {
  return createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "dapp-backend" },
    transports: [new transports.Console()],
  });
};
