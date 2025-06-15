const mongoose = require("mongoose")

const masterAdminModel = mongoose.Schema({
    email: {
        type: String
    }, password: {
        type: String
    }
}, { timestamps: true })


module.exports = mongoose.model("masterAdmin", masterAdminModel)