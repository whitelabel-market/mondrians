import Joi from "joi";
import crypto from "crypto";
import { logger } from "../logger/index.js";
import { deepMerge } from "./utils.js";

export let config = {};

const schema = Joi.object({
  jwt: Joi.object({
    jwtSecret: Joi.string()
      .optional()
      .default(crypto.randomBytes(32).toString("hex")),
    refreshSecret: Joi.string()
      .optional()
      .default(crypto.randomBytes(32).toString("hex")),
    signingAlgorithm: Joi.string()
      .insensitive()
      .not("none")
      .optional()
      .default("HS256"),
  }).default(),
  csrfSecret: Joi.string()
    .optional()
    .default(crypto.randomBytes(32).toString("hex")),
  app: Joi.object({
    port: Joi.number().optional().default(3000),
  })
    .optional()
    .default(),
  whitelisting: Joi.object({
    strategy: Joi.string()
      .optional()
      .valid("merkle", "voucher")
      .default("voucher"),
    signerPkey: Joi.when("strategy", {
      is: "voucher",
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    chainId: Joi.when("strategy", {
      is: "voucher",
      then: Joi.string().required().default("4"),
      otherwise: Joi.string().optional(),
    }),
    contractAddress: Joi.when("strategy", {
      is: "voucher",
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    domain: Joi.when("strategy", {
      is: "voucher",
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    version: Joi.when("strategy", {
      is: "voucher",
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
  })
    .optional()
    .default(),
  authorization: Joi.object({
    required: Joi.boolean().optional().default(true),
    trustedOrigins: Joi.array()
      .items(
        Joi.string().pattern(
          /^(?:([a-z0-9+.-]+):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
        )
      )
      .optional(),
    adminUsers: Joi.array().items(
      Joi.string()
        .pattern(/^0x[a-fA-F0-9]{40}$/i)
        .required()
    ),
  }).default(),
});

/**
 * creates configuration based on parameters and schema
 *
 * @param {Object} - configuration object
 * @returns {Object} - validated configuration object
 */
const createConfig = (params = {}) => {
  params = deepMerge(
    {
      jwt: {
        jwtSecret: process.env.JWT_SECRET,
        refreshSecret: process.env.REFRESH_SECRET,
        signingAlgorithm: process.env.SIGNING_ALG,
      },
      csrfSecret: process.env.CSRF_SECRET,
      app: {
        port: process.env.APP_PORT,
      },
      whitelisting: {
        strategy: process.env.WHITELISTING_STRATEGY,
        signerPkey: process.env.SIGNER_PKEY,
        chainId: process.env.CHAIN_ID,
        contractAddress: process.env.CONTRACT_ADDRESS,
        domain: process.env.WHITELISTING_DOMAIN,
        version: process.env.WHITELISTING_VERSION,
      },
      authorization: {
        required: process.env.AUTH_REQUIRED,
        trustedOrigins: process.env.TRUSTED_ORIGINS
          ? process.env.TRUSTED_ORIGINS.split(",")
          : undefined,
        adminUsers: process.env.ADMIN_USERS
          ? process.env.ADMIN_USERS.split(",")
          : undefined,
      },
    },
    params
  );

  const { value, error, warning } = schema.validate(params);

  if (error) {
    logger.error(error.details[0].message);
    throw new Error(error.details[0].message);
  }
  if (warning) {
    logger.warn(warning.message);
  }
  config = value;
  return config;
};

export default createConfig;
