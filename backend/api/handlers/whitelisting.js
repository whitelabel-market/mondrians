import { ethers } from "ethers";
import { signWhitelist } from "../../utils/voucher.js";
import { logger } from "../../logger/index.js";
import { whitelist } from "../../utils/whitelist.js";

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
