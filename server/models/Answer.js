/**
 * BACKEND: models/Answer.js
 */
const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    username: String,
    videoId: Number,
    answer: String,
});

module.exports = mongoose.model("Answer", AnswerSchema);
