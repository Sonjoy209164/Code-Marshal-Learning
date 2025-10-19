// src/middleware/validator.js
import Joi from 'joi';

/**
 * Validation middleware factory
 * usage: app.post('/path', validateBody(schema), handler)
 */

export const schemas = {
  userCreateSchema: Joi.object({
    name: Joi.string().min(2).max(150).required(),
    email: Joi.string().email().required()
  }),
  userUpdateSchema: Joi.object({
    name: Joi.string().min(2).max(150).required(),
    email: Joi.string().email().required()
  })
};

export function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return res.status(400).json({ status: 'error', message });
    }
    next();
  };
}

