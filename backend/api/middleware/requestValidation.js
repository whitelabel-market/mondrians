import { decrypt } from "../../utils/crypto.js";
import { config } from "../../utils/config.js";
import { logger } from "../../logger/index.js";
import { ensureNoBackslash } from "../../utils/utils.js";

const validate = async (data, req, res) => {
  const {
    address,
    requireCsrf,
    allowedOrigins,
    preflightCsrf,
    csrfHeader,
    origin,
    encryptionKey,
  } = data;

  if (!preflightCsrf) {
    logger.error("Preflight csrf value missing.");
    throw "Forbidden";
  }

  if (
    process.env.NODE_ENV === "production" &&
    origin &&
    Array.isArray(allowedOrigins) &&
    allowedOrigins.findIndex(
      (origin) => ensureNoBackslash(origin) === ensureNoBackslash(origin)
    ) < 0
  ) {
    logger.error(`The call is from an untrusted origin: ${origin}`);
    throw "Forbidden";
  }

  if (requireCsrf) {
    if (address && !address.match(/^0x[a-fA-F0-9]{40}$/g)) {
      throw "Forbidden";
    } else {
      const csrfToken = csrfHeader;
      if (csrfToken) {
        const decryptedToken = decrypt(address, csrfToken, encryptionKey);
        if (decryptedToken !== address) {
          logger.error(`Invalid csrf token for address: ${address}`);
          throw "Forbidden";
        }
      } else {
        logger.error(`No csrf token provided for address: ${address}`);
        throw "Forbidden";
      }
    }
  }
};

export const validateRequest = (requireCsrf = true) => {
  return async (req, res, next) => {
    console.log(req);
    const requestData = {
      preflightCsrf: req.headers.hasOwnProperty("x-csrf") ? true : false,
      csrfHeader: req.headers && req.headers["x-csrf-token"],
      address: req.headers && req.headers["x-viewer-address"],
      origin: req.headers["origin"] || req.headers["referer"],
      allowedOrigins: config.authorization.trustedOrigins,
      encryptionKey: config.csrfSecret,
      requireCsrf,
    };

    try {
      await validate(requestData, req, res);
      return next();
    } catch (e) {
      return res.status(403).send(e.toString());
    }
  };
};
