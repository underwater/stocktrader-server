const Joi = require("joi");

const PriceSchema = Joi.object({
    stock: Joi.string().required()
});

module.exports.PriceSchema = PriceSchema;
