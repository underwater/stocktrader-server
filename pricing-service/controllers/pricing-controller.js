const router = require("express").Router();
const asyncWrapper = require("../../utilities/async-wrapper").AsyncWrapper;
const validator = require("../middleware/validator");
const PricingService = require("../services/pricing-service");
const NotFoundError = require("../errors/not-found-error");
const authMiddleware = require("../middleware/auth");

const pricingService = new PricingService();

// router.use([authMiddleware]);
router.get(
    "/instance",  
    asyncWrapper(async(req, res, next) => {
        let price = await pricingService.getProcessInfo();
        if (!price) {
            throw new NotFoundError(`Stock ${stock} was not found`);
        }
        res.send(price);
    })
);
router.get("/allstocks",
    asyncWrapper(async(req, res, next) => {
        let price = await pricingService.getAllPrices();
        if (!price) {
            throw new NotFoundError(`No stocks were found`);
        }
        res.send(price);
    })
);
router.get(
    "/:stock", [validator({ model: "Price", scope: "stock", source: "params" })],
    asyncWrapper(async(req, res, next) => {
        let price = await pricingService.getCurrentPrice(req.params.stock);
        if (!price) {
            throw new NotFoundError(`Stock ${stock} was not found`);
        }
        res.send(price);
    })
);





module.exports = router;
