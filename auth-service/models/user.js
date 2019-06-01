const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const User = mongoose.model("User", new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: {createdAt: 'createdAt', updatedAt: "updatedAt"}
}));

module.exports = User;