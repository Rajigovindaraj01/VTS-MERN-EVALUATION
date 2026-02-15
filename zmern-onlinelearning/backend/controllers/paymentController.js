const Razorpay = require("razorpay");
const crypto = require("crypto");
const Enrollment = require("../models/Enrollment");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
exports.createOrder = async (req, res) => {
  const { courseId, amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature, studentId, courseId } = req.body;

  const body = order_id + "|" + payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === signature) {
    // Payment successful, save enrollment
    const enrollment = await Enrollment.create({
      studentId,
      courseId,
      progress: 0,
      paymentStatus: "completed",
    });

    return res.json({ message: "Payment verified", enrollment });
  } else {
    return res.status(400).json({ message: "Invalid signature" });
  }
};
