const Question = require("../models/Question");
const UserResponse = require("../models/UserResponse");

const submitAnswers = async (req, res) => {
  const { userId, answers } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({
        message: "Missing required field: userId",
      });
    }
    if (!Array.isArray(answers)) {
      return res.status(400).json({
        message: "Missing required body: answers",
      });
    }

    const existing = await UserResponse.findOne({ userId });
    if (existing)
      return res.status(400).json({ error: "User already submitted answers" });

    const response = new UserResponse({ userId, answers });
    await response.save();

    res.status(201).json({ message: "Answers submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: `Submission failed due to: ${err}` });
  }
};

const getAllResponses = async (req, res) => {
  try {
    const responses = await UserResponse.find({});
    const questions = await Question.find({});

    // Create a map for quick lookup of correct answers
    const correctAnswerMap = questions.reduce((map, q) => {
      map[q._id.toString()] = q.correctAnswer;
      return map;
    }, {});

    const enhancedResponses = responses.map((response) => {
      let score = 0;

      const answers = response.answers.map((ans) => {
        const correctAnswer = correctAnswerMap[ans.questionId];
        if (ans.selectedOption === correctAnswer) {
          score++;
        }

        return {
          _id: ans._id,
          questionId: ans.questionId,
          selectedOption: ans.selectedOption,
          correctAnswer: correctAnswer,
        };
      });

      return {
        userId: response.userId,
        score,
        answers,
      };
    });

    // Sort by score descending
    enhancedResponses.sort((a, b) => b.score - a.score);

    res.status(200).json(enhancedResponses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch responses" });
  }
};

module.exports = { submitAnswers, getAllResponses };
