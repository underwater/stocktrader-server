const ValidationError = require("../errors/validation-error");
const Joi = require("joi");
const User = require("../models/user");

const validators = {
    User: {
        scopes: {
            signup: User.SignUpSchema,
            signin: User.SignInSchema
        }
    }
};

function scopeExists(validator, scope) {
    return Object.keys(validator.scopes).find(s => s == scope) != undefined;
}

function getSchema(model, scope) {
    let validator = validators[model];
    if (!validator) {
        throw new ValidationError("Validator doesn't exist");
    }
    if (validator.scopes) {
        if (scope) {
            if (!scopeExists(validator, scope)) {
                throw new ValidationError(
                    `Scope ${scope} not found in model ${model}`
                );
            } else {
                return validator.scopes[scope];
            }
        } else {
            return validator.scopes["default"];
        }
    } else {
        return validator;
    }
}

//TODO: this is jsdoc, who can consume this ? VS  Any editor capable of reading jsdoc? this has nothing to do with typescript typing right ?
/**
 * @param {object} options
 * @param {string} [options.model]
 * @param {string} [options.scope]
 * @param {string} [options.source]
 */
//TODO: ValidatorMiddlewareFactory being exported by used under different name?
module.exports = function ValidatorMiddlewareFactory(options) {
    let model = options.model;
    let scope = options.scope;
    let source = options.source ? options.source : "body";

    return (req, res, next) => {
        let schema = getSchema(model, scope);

        // TODO: f12 on validate method doesn't go anywhere?
        let result = Joi.validate(req[source], schema);
        if (result.error) {
            throw new ValidationError(result.error.message);
        } else {
            next();
        }
    };
};
