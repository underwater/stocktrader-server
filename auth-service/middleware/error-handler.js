const ValidationError = require("../errors/validation-error");

function errorLogger(err, req, res, next) {
    // Log error
    next(err);
}

function authenticationErrorHandler(err, req, res, next) {
    // Check if the error is an AuthenticationError --> 401
    next(err);
}

function validationErrorHandler(err, req, res, next) {
    if(err instanceof ValidationError) {
        return res.sendStatus(400);
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