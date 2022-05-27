import { config } from "../../utils/config.js";
import jwt from "jsonwebtoken";

export const verifyJWT = () => {
  return async (req, res, next) => {
    // skip middleware if authorization disabled
    if (!config.authorization.required) {
      return next();
    }

    const address = req.headers && req.headers["x-viewer-address"];
    if (!address) throw "Missing address in header";

    if (
      req.headers["authorization"] &&
      !req.headers["authorization"].startsWith("Bearer ")
    )
      throw "Forbidden";

    const decoded = jwt.verify(
      req.headers["authorization"].split(" ")[1],
      config.jwt.jwtSecret
    );

    if (!decoded) throw "Forbidden";
    if (decoded.sub.toLowerCase() !== address.toLowerCase()) throw "Forbidden";

    next();
  };
};
