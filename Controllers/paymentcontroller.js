import Payment from "../Models/payment.js";
import Razorpay from "../config/razorpay.js";

export const donate = async (req, res) => {
  const { amount, currency } = req.body;
  const userId = req.body.userId;

  if (!amount) {
    return res
      .status(400)
      .json({ success: false, message: "Amount is required" });
  }

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required." });
  }

  try {
    // Create a Razorpay order
    const options = {
      amount: amount * 100, // Amount in paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await Razorpay.orders.create(options);

    // Save the order details using Sequelize
    const payment = await Payment.create({
      orderId: order.id,
      amount: amount,
      currency: currency || "INR",
      userId: userId,
      status: "created",
    });

    return res.json({
      success: true,
      message: "Order created successfully.",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentRecord: payment, // Optional: return DB record
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
