import express from "express";
import { getPoster, createPrintOrder } from "../handlers/index.js";
import { validateRequest } from "../middleware/requestValidation.js";
import {
  hasMondrian,
  verifyJWT,
  onlyLocal,
  canPrint,
} from "../middleware/authorization.js";

/**
 * creates prrinting related routes
 *
 * @returns {Express.Router} - Express router
 */
const printRouter = (config) => {
  const printerRouter = express.Router();

  /**
   * gets a new poster
   *
   * @returns {Express.Handler} - getPoster
   */
  printerRouter.get(
    "/poster",
    [onlyLocal()],
    async (req, res) => await getPoster(req, res, config)
  );

  /**
   * creates a new print order
   *
   * @returns {Express.Handler} - createPrintOrder
   */
  printerRouter.post(
    "/order",
    [validateRequest(), verifyJWT(), hasMondrian(), canPrint()],
    async (req, res) => await createPrintOrder(req, res, config)
  );

  return printerRouter;
};

export default printRouter;
