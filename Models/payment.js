import { DataTypes } from "sequelize";
import sequelize from "../config/Db.js";
import User from "./user.model.js"; // Import user model for association

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false, // Razorpay order ID
    },
    paymentId: {
      type: DataTypes.STRING, // Razorpay payment ID
      allowNull: true,
    },
    signature: {
      type: DataTypes.STRING, // Razorpay signature
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, // Payment amount
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "INR", // Default currency is INR
    },
    status: {
      type: DataTypes.ENUM("created", "paid", "failed"),
      defaultValue: "created",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Define association
Payment.belongsTo(User, { foreignKey: "userId" });

export default Payment;
