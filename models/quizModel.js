const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
  Question: {
    type: String,
    required: true,
  },
  Options: {
    type: [String],
    required: true,
  },
  Course: {
    type: String,
    required: true,
  },
  CorrectAnswer: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("quiz", quizSchema)