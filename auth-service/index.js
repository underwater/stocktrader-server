const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

//TODO:
const ErrorHandler = require("./middleware/error-handler");
const mongooseConnector = require("./models");

const PORT = process.env.PORT ? process.env.PORT : 3001;

// Controllers
const AuthController = require("./controllers/auth-controller");

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

///TODO: since '' path is default, could this have been simply app.use(AuthController);
//TODO: app.use(xx), xx is a middleware, or path / controller,
// TODO: where does routing fit in here?
app.use("", AuthController);

// TODO: what is difference use(ErrorHandler()) or use(ErrorHandler), was the () needed because we wanted the return of invoking the function (array of handlers) not the factory itself ?
app.use(ErrorHandler());

mongooseConnector()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Authentication Service running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(`Database connection failed`);
        console.error(err);
    });
