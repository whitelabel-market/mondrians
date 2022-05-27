import Joi from "joi";
import { logger } from "../../logger/index.js";

export const validateUser = async (req, res, next) => {
  const schema = Joi.object({
    address: Joi.when(req.method, {
      is: "POST",
      then: Joi.string()
        .required()
        .pattern(/^0x[a-fA-F0-9]{40}$/g),
      otherwise: Joi.string()
        .optional()
        .pattern(/^0x[a-fA-F0-9]{40}$/g),
    }),
    email: Joi.string().optional().email(),
    given_name: Joi.string().optional().min(1),
    last_name: Joi.string().optional().min(1),
    username: Joi.string().optional().min(4).max(30),
    created_at: Joi.date().timestamp().optional(),
    updated_at: Joi.date().timestamp().optional(),
    whitelisted: Joi.boolean().optional(),
  });

  const { value, error, warning } = await schema.validateAsync(params);

  if (error) {
    logger.error(error.details[0].message);
    throw new Error(error.details[0].message);
  }
  if (warning) {
    logger.warn(warning.message);
  }
  return value;
};
