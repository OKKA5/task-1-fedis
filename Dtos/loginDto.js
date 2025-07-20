const Joi = require("joi");

const validLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid address',
    'any.required':'Email is required',
  }),
  password: Joi.string().required().messages({
   'string.empty':'Password is required',
    'any.required':'Password is required',
  }),
});

module.exports = validLogin;
