const router = require("express").Router();
const asyncWrapper = require("../../utilities/async-wrapper").AsyncWrapper;
const validator = require("../middleware/validator");
const PricingService = require("../services/pricing-service");
const NotFoundError = require("../errors/not-found-error");
const authMiddleware = require("../middleware/auth");

const pricingService = new PricingService();

// router.use([authMiddleware]);

router.get(
    "/:stock", [validator({ model: "Price", scope: "stock", source: "params" })],
    asyncWrapper(async(req, res, next) => {
        let price = pricingService.getCurrentPrice(req.params.stock);
        if (!price) {
            throw new NotFoundError(`Stock ${stock} was not found`);
        }
        res.send(price);
    })
);

module.exports = router;
