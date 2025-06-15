const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    number: {
        type: Number
    },
    courseType: {
        type: String
    },

}, { timestamps: true })

module.exports = mongoose.model("userModel", userModel)