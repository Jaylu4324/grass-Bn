const mongoose = require('mongoose');

const  quizModel = mongoose.Schema({
    Question: {
        type: String,
    },
    Options: {
        type: Array,
    },
    Course:{
        type: String,
    },
    CorrectAnswer: {
        type: String,
    },
})

module.exports = mongoose.model("quiz", quizModel)