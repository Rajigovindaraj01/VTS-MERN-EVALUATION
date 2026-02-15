const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  review: String
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
