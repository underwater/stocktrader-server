const jwt = require("jsonwebtoken");
const AuthenticationError = require("../errors/authentication-error");

module.exports = function AuthMiddleware(req, res, next) {
    const ISSUER = process.env.TOKEN_ISSUER;
    const AUDIENCE = process.env.AUDIENCE;
    const AUTH_SECRET = process.env.AUTH_SECRET;
    let authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        next(new AuthenticationError(`Token is missing from the request`));
    }
    else {
        try {
            // Bearer <TOKEN>
            let parsed = authorizationHeader.split(" ");
            let token = parsed[1];
            let result = jwt.verify(token, AUTH_SECRET, {
                audience: AUDIENCE,
                issuer: ISSUER
            });
            req.user = result.user;
            next();
        }
        catch(e) {
            next(new AuthenticationError(`Token not found`));
        }
    }
}
