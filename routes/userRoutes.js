const express = require("express");
const router = express.Router();
const { submitAnswers, getUser } = require("../controllers/userController");

router.post("/submit", submitAnswers);

module.exports = router;
