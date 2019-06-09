const router = require("express").Router();
const asyncWrapper = require("../../utilities/async-wrapper").AsyncWrapper;

const validator = require("../middleware/validator");

router.post("/signup", [validator({model: 'User', scope: 'signup', source: 'body'})], asyncWrapper(async (req, res) => {
    
}));

router.post("/signin", [validator({model: 'User', scope: 'signin', source: 'body'})], asyncWrapper(async (req, res) => {
    
}));

module.exports = router;