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

    let watcher;
    socket.on("disconnect", () => {
        if (watcher) {
            watcher.stop();
        }
    });

    socket.on("startPriceWatch", message => {
        console.log(message);
        if (watcher) {
            watcher.stop();
        }
        message = message ? JSON.parse(message) : null;
        let stocks = message ? message.stocks : null;
        console.log(stocks);
        watcher = pricingService.watchLivePrices(stocks, (err, prices) => {
            if (!err) {
                console.log(prices); //[{name: '', price}]
                socket.emit("stockPricesChanged", prices);
            }
            else {
                console.error(err);
            }
        });
    });

    socket.on("stopPriceWatch", () => {
        if (watcher) {
            watcher.stop();
        }
    });
});

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

app.use("", PricingController);

app.use(ErrorHandler());

server.listen(PORT, () => {
    console.log(`Pricing Service running on port ${PORT}`);
});
