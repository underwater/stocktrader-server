const ValidationError = require("../errors/validation-error");
const AuthenticationError = require("../errors/authentication-error");

function errorLogger(err, req, res, next) {
    // Log error
    console.error(err);
    next(err);
}

/** ----------- */

function authenticationErrorHandler(err, req, res, next) {
    if (err instanceof AuthenticationError) {
        return res.sendStatus(401);
    }
    next(err);
}

function validationErrorHandler(err, req, res, next) {
    if(err instanceof ValidationError) {
        if (process.env.NODE_ENV == "development") {
            return res.status(400).send(err.message);
        }
        else {
            return res.sendStatus(400);
        }
    }
    next(err);
}

function accessDeniedErrorHandler(err, req, res, next) {
    //Check if the error is An AccessDeniedError --> 403
    next(err);
}

function genericErrorHandler(err, req, res, next) {
    return res.sendStatus(500);
}

module.exports = function ErrorHandlingFactory() {
    return [
        errorLogger,
        authenticationErrorHandler,
        validationErrorHandler,
        accessDeniedErrorHandler,
        genericErrorHandler
    ];
}
