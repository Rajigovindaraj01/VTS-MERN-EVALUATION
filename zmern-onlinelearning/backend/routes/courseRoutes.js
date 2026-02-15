const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const {
  addCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

// Add new course (Admin only)
router.post("/", auth, upload.array("videos", 10), addCourse);

// Get all courses
router.get("/", getCourses);

// Get single course
router.get("/:id", getCourseById);

// Update course (Admin only)
router.put("/:id", auth, upload.array("videos", 10), updateCourse);

// Delete course (Admin only)
router.delete("/:id", auth, deleteCourse);

module.exports = router;
