const ValidationError = require("../errors/validation-error");
const AuthenticationError = require("../errors/authentication-error");

function errorLogger(err, req, res, next) {
    // Log error
    console.error(err);
    next(err);
}

/** ----------- */
// TODO: could this authenticationErrorHandler have been with a different signature like (err, req, res) or (req, res)
// TODO: Would changing the signature above have only caused (possibly) runtime errors (no compile errors in nodejs)

function authenticationErrorHandler(err, req, res, next) {
    if (err instanceof AuthenticationError) {
        return res.sendStatus(401);
    }
    next(err);
}

function validationErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        if (process.env.NODE_ENV == "development") {
            return res.status(400).send(err.message);
        } else {
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

// TODO: why is a function name even needed since on the require side, it is being assigned a new name anyways
module.exports = function ErrorHandlingFactory() {
    return [
        errorLogger,
        authenticationErrorHandler,
        validationErrorHandler,
        accessDeniedErrorHandler,
        genericErrorHandler
    ];
};
