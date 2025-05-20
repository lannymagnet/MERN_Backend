const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [(arr) => arr.length === 4, "Must have exactly 4 options"],
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
