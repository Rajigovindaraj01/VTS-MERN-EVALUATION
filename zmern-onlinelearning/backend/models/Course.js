const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: String,
  videoUrl: String
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  modules: [moduleSchema]
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
