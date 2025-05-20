const mongoose = require("mongoose");
const Question = require("../models/Question");
const defaultQuestions = require("../data/questions");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed questions if DB is empty
    const questionCount = await Question.countDocuments();
    if (questionCount === 0) {
      await Question.insertMany(defaultQuestions);
      console.log("Default questions seeded!");
    } else {
      console.log("Questions already exist, skipping seed.");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;
