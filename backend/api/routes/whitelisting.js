import express from "express";
import { getVoucher } from "../handlers/index.js";
import { validateRequest } from "../middleware/requestValidation.js";
import { verifyJWT } from "../middleware/authorization.js";

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
    [validateRequest(), verifyJWT()],
    async (req, res) => await getVoucher(req, res, config)
  );

  return whitelistRouter;
};

export default wlRouter;
