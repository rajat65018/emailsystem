const Joi = require("joi");
const singupSchema = {
  body: {
    name: Joi.string().min(3).max(20).required().description("User name"),
    email: Joi.string().email().required().description("User Email"),
    password: Joi.string().min(5).max(10).description("User password"),
  },
};
module.exports = singupSchema;
