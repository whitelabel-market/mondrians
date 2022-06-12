import { logger } from "../../logger/index.js";
import { config } from "../../utils/config.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "../../utils/jwt.js";
import axios from "axios";
import { ethers } from "ethers";
import { encrypt } from "../../utils/crypto.js";

const api = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/whitelabel-market/mondrians/main/backend/utils",
  headers: {
    Authorization: `token ${process.env.GH_PAT}`,
    Accept: "application/vnd.github.v4.raw",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export const verifyJWT = () => {
  return async (req, res, next) => {
    // skip middleware if authorization disabled
    if (!config.authorization.required) {
      return next();
    }

    if (
      req.headers["authorization"] &&
      !req.headers["authorization"].startsWith("Bearer ")
    )
      return res.status(403).json("Forbidden");

    const decoded = verifyAccessToken(
      req.headers["authorization"].split(" ")[1]
    );

    req.accessToken = decoded;

    if (!decoded) return res.status(403).json("Forbidden");
    else return next();
  };
};

export const isWhitelisted = () => {
  return async (req, res, next) => {
    // skip middleware if authorization disabled
    if (!config.authorization.required) {
      return next();
    }
    const headerAddress = req.headers && req.headers["x-viewer-address"];
    const { address: queryAddress } = req.query;
    const { accessToken } = req;

    const address = accessToken
      ? accessToken.sub
      : headerAddress || queryAddress;

    const { data: whitelist } = await api.get("/whitelist.json");

    const index = whitelist.findIndex(
      (whitelisted) => whitelisted.toLowerCase() === address.toLowerCase()
    );

    if (index < 0) return res.status(401).json("Unauthenticated");
    else return next();
  };
};

export const hasMondrian = () => {
  return async (req, res, next) => {
    // skip middleware if authorization disabled
    if (!config.authorization.required) {
      return next();
    }

    const headerAddress = req.headers && req.headers["x-viewer-address"];
    const { address: queryAddress } = req.query;
    const { accessToken } = req;

    const address = accessToken
      ? accessToken.sub
      : headerAddress || queryAddress;

    // TODO: change to correct network
    const dic_net = {
      name: "maticmum",
      chainId: 80001,
      _defaultProvider: (providers) =>
        new providers.JsonRpcProvider(
          "https://matic-mumbai.chainstacklabs.com"
        ),
    };

    const provider = ethers.getDefaultProvider(dic_net);

    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      ["function balanceOf(address owner) public view returns (uint256)"],
      provider
    );

    const balance = await contract.balanceOf(address);
    if (balance.isZero()) return res.status(403).json("Forbidden");
    else return next();
  };
};

export const onlyLocal = () => {
  return async (req, res, next) => {
    // skip middleware if authorization disabled
    if (!config.authorization.required) {
      return next();
    }

    const isLocal =
      req.connection.localAddress === req.connection.remoteAddress;
    if (!isLocal) return res.status(403).json("Forbidden");
    else return next();
  };
};

export const isAuthenticated = () => {
  return async (req, res, next) => {
    // skip middleware if authorization disabled
    if (!config.authorization.required) {
      return next();
    }

    const address = req.headers && req.headers["x-viewer-address"];

    try {
      console.log(req.cookies["refresh_token"]);
      if (req.cookies && req.cookies["refresh_token"]) {
        const decoded = verifyRefreshToken(req.cookies["refresh_token"]);

        if (
          decoded &&
          decoded.typ === "Refresh" &&
          decoded.sub.toLowerCase() === address.toLowerCase()
        ) {
          const iat = Math.round(Date.now() / 1000);

          const payload = {
            iat,
            sub: address,
            iss: "MagicMondrian",
            typ: "Bearer",
          };

          const accessToken = generateAccessToken(payload);
          const csrfToken = encrypt(address, config.csrfSecret);

          return res.status(200).json({ jwt: accessToken, csrfToken });
        }
      }
      return next();
    } catch (e) {
      console.log(e);
      // Not authenticated, so send message to sign
      return next();
    }
  };
};
