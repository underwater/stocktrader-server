const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const ErrorHandler = require("./middleware/error-handler");

const PORT = process.env.PORT ? process.env.PORT : 3002;
const PRICE_INTERVAL = process.env.PRICE_INTERVAL;

// Controllers
const PricingController = require("./controllers/pricing-controller");

const PricingService = require("./services/pricing-service");
const pricingService = new PricingService();

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("Client connected");

    socket.on("disconnect", () => {
        console.log("client disconnected");
    });

    setInterval(async() => {
        let currentPrices = await pricingService.getAllPrices();
        io.emit("stockPricesChanged", currentPrices);
    }, PRICE_INTERVAL);

});

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

app.use("", PricingController);

app.use(ErrorHandler());

server.listen(PORT, () => {
    console.log(`Pricing Service running on port ${PORT}`);
});
