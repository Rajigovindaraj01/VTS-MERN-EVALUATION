const Feedback = require("../models/Feedback");
const Enrollment = require("../models/Enrollment");

// Add feedback after course completion
exports.addFeedback = async (req, res) => {
  try {
    const { courseId, rating, review } = req.body;
    const studentId = req.user._id;

    // Check if enrolled
    const enrollment = await Enrollment.findOne({
      studentId,
      courseId,
    });

    if (!enrollment)
      return res.status(400).json({ message: "You are not enrolled in this course" });

    // Check if already reviewed
    const existing = await Feedback.findOne({ studentId, courseId });
    if (existing)
      return res.status(400).json({ message: "Feedback already submitted" });

    const feedback = await Feedback.create({
      courseId,
      studentId,
      rating,
      review,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all feedback for a course
exports.getCourseFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      courseId: req.params.courseId,
    }).populate("studentId", "name");

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
