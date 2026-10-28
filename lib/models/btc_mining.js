import mongoose from "mongoose";
import User from "./user";

const btcMiningSchema = new mongoose.Schema(
  {
    transactionID: {
      type: String,},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    currency: {
      type: String,
    },
    amount: { type: mongoose.Schema.Types.Decimal128, },
    status: {
      type: String,
      enum: ["Pending", "Successful", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.BTC_Mining ||
  mongoose.model("BTC_Mining", btcMiningSchema);
