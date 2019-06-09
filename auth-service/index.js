const express = require("express");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error-handler");

const PORT = process.env.PORT ? process.env.PORT : 3001;

// Controllers
const AuthController = require("./controllers/auth-controller");

const app = express();

app.use(bodyParser.json());

app.use("/api/auth", AuthController);

app.use(ErrorHandler());

app.listen(PORT, () => {
    console.log(`Authentication Service running on port ${PORT}`);
});