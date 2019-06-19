const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ErrorHandler = require("./middleware/error-handler");
const mongooseConnector = require("./models");

const PORT = process.env.PORT ? process.env.PORT : 3001;

// Controllers
const AuthController = require("./controllers/auth-controller");

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/api/auth", AuthController);

app.use(ErrorHandler());
mongooseConnector().then(() => {
    app.listen(PORT, () => {
        console.log(`Authentication Service running on port ${PORT}`);
    });
}).catch(err => {
    console.error(`Database connection failed`);
    console.error(err);
});