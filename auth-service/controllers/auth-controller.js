//TODO: IN asp.net routing precedes instatiating controllers, but here it seems that the routing is happening after this controller is loaded?

const router = require("express").Router();
const asyncWrapper = require("../../utilities/async-wrapper").AsyncWrapper;
const UsersService = require("../services/users-service");
const ValidationError = require("../errors/validation-error");
const AuthenticationError = require("../errors/authentication-error");

const validator = require("../middleware/validator");
const usersService = new UsersService();

///TODO: router.post is receiving "Hard coded array of request handlers"?
///TODO: what is the signature of the RequestHandler? Is it (req, res) or (req, res, next) or even (err, req, res, next)
///TODO: clicking F12 on post method doesn't give a helpful index.d.ts

router.post(
    // TODO: is defining the names of the properties of this object essential syntax or could we have said { "User", "signup", "body" }
    "/signup", [validator({ model: "User", scope: "signup", source: "body" })],
    asyncWrapper(async(req, res) => {
        let existingUser = await usersService.findByEmail(req.body.email);
        if (existingUser) {
            throw new ValidationError("User already exists");
        }
        let token = await usersService.create(req.body);
        res.send(token);
    })
);

//TODO: what is [validator({model: 'User', scope: 'signin', source: 'body'})] doing,
//TODO: why is it in an ARRAY  containing a FUNCTION invokation taking in an OBJECT?
router.post(
    "/signin", [validator({ model: "User", scope: "signin", source: "body" })],
    asyncWrapper(async(req, res) => {
        let { email, password } = req.body;
        let token = await usersService.signIn(email, password);
        if (!token) {
            throw new AuthenticationError("Invalid Credentials");
        } else {
            res.send(token);
        }
    })
);

module.exports = router;
