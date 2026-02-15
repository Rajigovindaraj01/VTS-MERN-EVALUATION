const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addFeedback,
  getCourseFeedback,
} = require("../controllers/feedbackController");

// Add feedback (Student only)
router.post("/", auth, addFeedback);

// Get feedback for a course
router.get("/:courseId", getCourseFeedback);

module.exports = router;
