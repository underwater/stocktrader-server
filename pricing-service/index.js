const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const ErrorHandler = require("./middleware/error-handler");

const PORT = process.env.PORT ? process.env.PORT : 3002;

// Controllers
const PricingController = require("./controllers/pricing-controller");

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

app.use("", PricingController);

app.use(ErrorHandler());

app.listen(PORT, () => {
    console.log(`Pricing Service running on port ${PORT}`);
});
