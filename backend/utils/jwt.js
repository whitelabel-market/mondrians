import jwt from "jsonwebtoken";
import { config } from "./config.js";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.jwt.jwtSecret, {
    expiresIn: "15m",
    algorithm: config.jwt.signingAlgorithm,
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: "1d",
    algorithm: config.jwt.signingAlgorithm,
  });
};

export const verifyAccessToken = (token) => {
  const payload = jwt.verify(token, config.jwt.jwtSecret);
  return payload;
};

export const verifyRefreshToken = (token) => {
  const payload = jwt.verify(token, config.jwt.refreshSecret);
  return payload;
};

export const setRefreshToken = (res, token) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    secure: true,
    expired: 1000 * 60 * 60 * 24,
    sameSite: "none",
    domain:
      process.env.NODE_ENV === "development"
        ? "localhost"
        : "api.whitelabel-market.com",
  });
  // path
};
