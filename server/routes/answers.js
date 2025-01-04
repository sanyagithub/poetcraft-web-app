/**
 * BACKEND: routes/answers.js
 */
const express = require("express");
const Answer = require("../models/Answer");

const router = express.Router();

// Submit an answer
router.post("/submit", async (req, res) => {
    const { username, videoId, answer } = req.body;
    const newAnswer = new Answer({ username, videoId, answer });
    await newAnswer.save();
    res.json("Answer submitted successfully");
});

// Get answers for a specific video
router.get("/:videoId", async (req, res) => {
    const { videoId } = req.params;
    const answers = await Answer.find({ videoId });
    res.json(answers);
});

module.exports = router;
