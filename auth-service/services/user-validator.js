// https://stackoverflow.com/questions/51596255/using-joi-schemas-alongside-mongoose-schemas
//  for validation of any rules when working with user before creating a doc of it.

Joi = require("joi");
mongoose = require("mongoose");
let userSchema;

module.exports = class UserValidator {
  constructor() {
    userSchema = mongoose.Schema({
      username: String,
      password: String,
      email: String,
      full_name: String,
      created: { type: Date, default: Date.now }
    });
  }

  validateUser(user) {
    userSchema.methods.joiValidate = function(obj) {
      var schema = {
        firstName: Joi.types.String().required(),

        lastName: Joi.types.String().required(),

        password: Joi.types.String().required(),

        email: Joi.types
          .String()
          .email()
          .required(),
      };

      return Joi.validate(user, schema);
    };
  }
};
