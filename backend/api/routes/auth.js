import express from "express";
import { login, callback } from "../handlers/index.js";
import { validateRequest } from "../middleware/requestValidation.js";
import { isAuthenticated } from "../middleware/authorization.js";

/**
 * creates authentication related routes for
 *
 * @returns {Express.Router} - Express router
 */
const authRouter = (config) => {
  const authenticationRouter = express.Router();

  /**
   * challenge user with signature request
   *
   * @returns {Express.Handler} - login handler
   */
  authenticationRouter.post(
    "/login",
    [validateRequest(false), isAuthenticated()],
    async (req, res) => await login(req, res, config)
  );

  /**
   * verify challenge and set cookies
   *
   * @returns {Express.Handler} - login handler with register true
   */
  authenticationRouter.post(
    "/callback",
    validateRequest(),
    async (req, res) => await callback(req, res, config)
  );

  return authenticationRouter;
};

export default authRouter;
