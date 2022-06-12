import { ethers } from "ethers";
import crypto from "crypto";
import { encrypt } from "../../utils/crypto.js";
import { logger } from "../../logger/index.js";
import { client } from "../../utils/redis.js";
import {
  generateAccessToken,
  setRefreshToken,
  generateRefreshToken,
} from "../../utils/jwt.js";

const getMessage = (address, nonce) => {
  return `Welcome to the world of Magic Mondrian NFT's'!\n\nClick to sign to login.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${address}\n\nNonce:\n${nonce}`;
};

/**
 * returns a cryptographic login challenge
 *
 * @param {Object} req - express request object
 * @param {Object} res - express request object
 * @returns {String} - message to sign
 */
export const login = async (req, res, config) => {
  try {
    const address = req.headers && req.headers["x-viewer-address"];
    if (!address) throw new Error("Missing address in request body");
    logger.info(`Received login challenge request from address: ${address}`);

    const nonce = crypto.randomBytes(32).toString("hex");

    await client.set(address, JSON.stringify({ address, nonce }), {
      EX: 60 * 60,
    });

    const message = getMessage(address, nonce);
    const csrfToken = encrypt(address, config.csrfSecret);

    return res.status(200).json({ csrfToken, message });
  } catch (e) {
    logger.error(e.toString());
    return res.status(400).json(e.toString());
  }
};

/**
 * handles login callback and exchanges json webtoken
 *
 * @param {Object} req - express request object
 * @param {Object} res - express request object
 * @returns {Object} jwt token
 */
export const callback = async (req, res, config) => {
  try {
    const address = req.headers && req.headers["x-viewer-address"];
    const { signature } = req.body;

    if (!address) throw new Error("Missing address in request body");
    if (!signature) throw new Error("Missing signature in request body");

    logger.info(`Received login callback request from address: ${address}`);

    let user = await client.get(address);
    const parsedUser = JSON.parse(user);

    if (parsedUser && !parsedUser.nonce)
      throw new Error("No nonce available for user");

    const message = getMessage(address, parsedUser.nonce);

    const recoveredAddress = await ethers.utils.recoverAddress(
      ethers.utils.arrayify(ethers.utils.hashMessage(message)),
      signature
    );

    if (recoveredAddress.toLowerCase() !== address.toLowerCase())
      throw new Error("Signature verification failed");

    const iat = Math.round(Date.now() / 1000);

    const payload = {
      iat,
      sub: address,
      iss: "MagicMondrian",
      typ: "Bearer",
    };

    const accessToken = generateAccessToken(payload);
    payload.typ = "Refresh";
    const refreshToken = generateRefreshToken(payload);
    setRefreshToken(res, refreshToken);

    return res.status(200).json({ jwt: accessToken });
  } catch (e) {
    logger.error(e.toString());
    return res.status(401).json("Unauthenticated");
  }
};
