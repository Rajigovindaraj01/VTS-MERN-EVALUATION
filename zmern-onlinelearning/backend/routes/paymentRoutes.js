const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");
const auth = require("../middleware/authMiddleware");

// Create Razorpay order
router.post("/order", auth, createOrder);

// Verify payment and save enrollment
router.post("/verify", auth, verifyPayment);

module.exports = router;
