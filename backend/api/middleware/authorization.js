import { config } from "../../utils/config.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "../../utils/jwt.js";
import axios from "axios";
import { ethers } from "ethers";
import { encrypt } from "../../utils/crypto.js";
import CONFIG from "../../../config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const api = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/whitelabel-market/mondrians/main/backend/utils",
  headers: {
    Authorization: `token ${CONFIG.whitelisting.ghPat}`,
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
      return res.status(403).send("Forbidden");

    try {
      const decoded = verifyAccessToken(
        req.headers["authorization"].split(" ")[1]
      );

      req.accessToken = decoded;
      if (!decoded) return res.status(403).send("Forbidden");
    } catch (e) {
      return res.status(401).send("Unauthenticated");
    }

    return next();
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

    if (index < 0) return res.status(401).send("Unauthenticated");
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
      name: CONFIG.chainList.shortName,
      chainId: CONFIG.chainId,
      _defaultProvider: (providers) =>
        new providers.JsonRpcProvider(CONFIG.chainList.rpc[2]),
    };
    const provider = ethers.getDefaultProvider(dic_net);

    const contract = new ethers.Contract(
      CONFIG.contract,
      ["function balanceOf(address owner) public view returns (uint256)"],
      provider
    );

    const balance = await contract.balanceOf(address);

    if (balance.isZero())
      return res.status(403).send("Not owner of a Mondrian");
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
    if (!isLocal) return res.status(403).send("Forbidden");
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

export const canPrint = () => {
  return async (req, res, next) => {
    // skip middleware if authorization disabled
    if (!config.authorization.required) {
      return next();
    }

    const headerAddress = req.headers && req.headers["x-viewer-address"];
    const { address: queryAddress } = req.query;
    const { accessToken } = req;
    const { token } = req.body;

    if (!token.hasOwnProperty("id"))
      return res.status(400).json("Invalid request body");

    const address = accessToken
      ? accessToken.sub
      : headerAddress || queryAddress;

    const dic_net = {
      name: CONFIG.chainList.shortName,
      chainId: CONFIG.chainId,
      _defaultProvider: (providers) =>
        new providers.JsonRpcProvider(CONFIG.chainList.rpc[2]),
    };

    const provider = ethers.getDefaultProvider(dic_net);

    const contract = new ethers.Contract(
      CONFIG.contract,
      [
        "function hasPrintedOnce(address, uint256) public view returns (bool)",
        "function ownerOf(uint256) public view returns (address)",
      ],
      provider
    );

    try {
      const owner = await contract.ownerOf(token.id);
      if (owner.toLowerCase() !== address.toLowerCase())
        return res.status(403).send(`Not owner of token with id ${token.id}`);

      const hasPayedForPrint = await contract.hasPrintedOnce(address, token.id);
      if (!hasPayedForPrint) return res.status(403).send("Not paid for print");

      const files = fs.readdirSync(path.join(__dirname, "../../screenshots/"));
      const index = files.findIndex((file) =>
        file.toLowerCase().startsWith(`${address.toLowerCase()}_${token.id}_`)
      );
      if (index > -1)
        return res
          .status(403)
          .send(`Already printed Token with id ${token.id}`);

      return next();
    } catch (e) {
      return res.status(400).send(e.toString());
    }
  };
};
