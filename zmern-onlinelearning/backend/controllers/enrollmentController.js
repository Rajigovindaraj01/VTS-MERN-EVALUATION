const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// Enroll in a course
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user._id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if already enrolled
    const existing = await Enrollment.findOne({ studentId, courseId });
    if (existing)
      return res.status(400).json({ message: "Already enrolled in this course" });

    const enrollment = await Enrollment.create({
      studentId,
      courseId,
      progress: 0,
      completed:false,
      paymentStatus: "completed" // or "pending" if using Razorpay
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get logged-in student's enrollments
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      studentId: req.user._id,
      paymentStatus:"completed",
    }).populate({
      path:"courseId",
      select:"title description price modules"
    });

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update course progress
exports.updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    enrollment.progress = progress;
    await enrollment.save();

    res.json({ message: "Progress updated", enrollment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
