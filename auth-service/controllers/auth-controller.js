const router = require("express").Router();
const asyncWrapper = require("../../utilities/async-wrapper").AsyncWrapper;
const UsersService = require("../services/users-service");
const ValidationError = require("../errors/validation-error");
const AuthenticationError = require("../errors/authentication-error");

const validator = require("../middleware/validator");
const usersService = new UsersService();

router.post("/signup", [validator({model: 'User', scope: 'signup', source: 'body'})], asyncWrapper(async (req, res) => {
    let existingUser = await usersService.findByEmail(req.body.email);
    if (existingUser) {
        throw new ValidationError("User already exists");
    }
    let token = await usersService.create(req.body);
    res.send(token);
}));

router.post("/signin", [validator({model: 'User', scope: 'signin', source: 'body'})], asyncWrapper(async (req, res) => {
    let { email, password } = req.body;
    let token = await usersService.signIn(email, password);
    if (!token) {
        throw new AuthenticationError("Invalid Credentials");
    }
    else {
        res.send(token);
    }
}));

module.exports = router;
