import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${label} | ${timestamp} [${level}]: ${message}`;
});

export const buildDevLogger = () => {
  return createLogger({
    level: process.env.LOG_LEVEL,
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
