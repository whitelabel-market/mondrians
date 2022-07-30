import jwt from "jsonwebtoken";
import { config } from "./config.js";
import CONFIG from "../../config.js";

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
  try {
    const payload = jwt.verify(token, config.jwt.jwtSecret);
    return payload;
  } catch (e) {
    throw e.toString();
  }
};

export const verifyRefreshToken = (token) => {
  try {
    const payload = jwt.verify(token, config.jwt.refreshSecret);
    return payload;
  } catch (e) {
    throw e.toString();
  }
};

export const setRefreshToken = (res, token) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    expired: 1000 * 60 * 60 * 24,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    domain:
      process.env.NODE_ENV === "development"
        ? "localhost"
        : CONFIG.backend.url.replace("https://", ""),
  });
};
