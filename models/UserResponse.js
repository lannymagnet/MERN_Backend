const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // Ensures a user can only attempt once
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      selectedOption: String,
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserResponse", userResponseSchema);
