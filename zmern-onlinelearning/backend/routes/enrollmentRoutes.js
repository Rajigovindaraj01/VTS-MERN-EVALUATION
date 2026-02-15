const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  enrollCourse,
  getMyEnrollments,
  updateProgress
} = require("../controllers/enrollmentController");

// Enroll in a course
router.post("/", auth, enrollCourse);

// Get logged-in student's enrollments
router.get("/my", auth, getMyEnrollments);

// Update progress
router.put("/:id/progress", auth, updateProgress);

module.exports = router;
