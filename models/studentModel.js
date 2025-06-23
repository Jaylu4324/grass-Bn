const mongoose = require("mongoose")


const studentModel = mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },

    number: {
        type: Number
    },
    course: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String
    }


})

module.exports = mongoose.model("student", studentModel)

