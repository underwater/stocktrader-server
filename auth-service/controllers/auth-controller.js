const router = require("express").Router();
const asyncWrapper = require("../../utilities/async-wrapper").AsyncWrapper;

router.post("/signup", asyncWrapper(async (req, res) => {
    
}));

router.post("/signin", asyncWrapper(async (req, res) => {
    
}));

module.exports = router;