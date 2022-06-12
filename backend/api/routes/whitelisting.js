import express from "express";
import { getVoucher, getPass, getMail } from "../handlers/index.js";
import { validateRequest } from "../middleware/requestValidation.js";
import {
  verifyJWT,
  isWhitelisted,
  hasMondrian,
} from "../middleware/authorization.js";

/**
 * creates whitelisting related routes
 *
 * @returns {Express.Router} - Express router
 */
const wlRouter = (config) => {
  const whitelistRouter = express.Router();

  /**
   * gets a voucher for an address for whitelist sale
   *
   * @returns {Express.Handler} - getVoucher
   */
  whitelistRouter.get(
    "/voucher",
    [validateRequest(), verifyJWT(), isWhitelisted()],
    async (req, res) => await getVoucher(req, res, config)
  );

  whitelistRouter.get(
    "/pass",
    [isWhitelisted(), hasMondrian()],
    async (req, res) => await getPass(req, res, config)
  );

  whitelistRouter.post(
    "/email",
    [validateRequest(), verifyJWT(), isWhitelisted(), hasMondrian()],
    async (req, res) => await getMail(req, res, config)
  );

  return whitelistRouter;
};

export default wlRouter;
