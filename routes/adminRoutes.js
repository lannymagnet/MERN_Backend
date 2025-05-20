const express = require("express");
const router = express.Router();
const { getAllResponses } = require("../controllers/userController");

router.get("/responses", getAllResponses);

module.exports = router;
