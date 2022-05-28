import { ethers } from "ethers";
import { signWhitelist } from "../../utils/voucher.js";
import { logger } from "../../logger/index.js";
import axios from "axios";

const api = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/whitelabel-market/mondrians/main/backend/utils",
  headers: {
    Authorization: `token ${process.env.GH_PAT}`,
    Accept: "application/vnd.github.v4.raw",
  },
});

/**
 * returns a voucher for whitelist sale
 *
 * @param {Object} req - express request object
 * @param {Object} res - express request object
 * @returns {String} - voucher
 */
export const getVoucher = async (req, res, config) => {
  try {
    const address = req.headers && req.headers["x-viewer-address"];
    if (!address) throw "Missing address in header";
    logger.info(`Received voucher request from address: ${address}`);
    console.log(api);
    const { data: whitelist } = await api.get("/whitelist.json");
    console.log(whitelist);

    const index = whitelist.findIndex(
      (whitelisted) => whitelisted.toLowerCase() === address.toLowerCase()
    );
    if (index < 0) throw "Not whitelisted";

    const signer = new ethers.Wallet(process.env.SIGNER_PKEY);
    const voucher = await signWhitelist(
      config.whitelisting.chainId,
      config.whitelisting.contractAddress,
      signer,
      address
    );

    res.status(200).json({ signature: voucher });
  } catch (e) {
    logger.error(e.toString());
    return res.status(400).json(e.toString());
  }
};
