import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;
import CONFIG from "../../config.js";

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${label} | ${timestamp} [${level}]: ${message}`;
});

export const buildDevLogger = () => {
  return createLogger({
    level: CONFIG.backend.logLevel,
    format: combine(
      format.colorize(),
      label({ label: "dapp-backend" }),
      timestamp(),
      format.errors({ stack: true }),
      myFormat
    ),
    transports: [new transports.Console()],
  });
};
