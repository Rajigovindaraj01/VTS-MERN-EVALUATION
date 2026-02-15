const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false},
  paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
