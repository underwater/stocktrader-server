const mongoose = require("mongoose");

// Do not delete these lines
const User = require("./user");

mongoose.Promise = global.Promise;  //A+ Promise

const connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/authentication`;

module.exports = function() {
    console.log(`Connecting to ${connectionString}`);
    return new Promise((resolve, reject) => {
        mongoose.connection.on("open", () => {
            resolve(mongoose);
        });

        mongoose.connection.on("error", err => {
            reject(err);
        });

        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            authSource: "admin"
        });
    });
}
