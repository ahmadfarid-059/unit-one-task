const joi = require("joi");

module.exports = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
});
