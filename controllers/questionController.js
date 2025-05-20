const Question = require("../models/Question");

const getQuestions = async (req, res) => {
  try {
    // Hide correctAnswer to not send it.
    const questions = await Question.find({}, "-correctAnswer");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch questions due to: ${err}` });
  }
};

module.exports = { getQuestions };
