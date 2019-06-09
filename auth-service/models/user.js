const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const Joi = require("joi");


const User = mongoose.model(
  "User",
  new Schema(
    {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    },
    {
      timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
    }
  )
);

const EmailSchema = Joi.string().email().required();
const PasswordSchema = Joi.string().min(6).required();

const SignUpSchema = Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    email: EmailSchema,
    password: PasswordSchema
});

const SignInSchema = Joi.object({
    email: EmailSchema,
    password: PasswordSchema
});

module.exports = User;
module.exports.SignUpSchema = SignUpSchema;
module.exports.SignInSchema = SignInSchema;
