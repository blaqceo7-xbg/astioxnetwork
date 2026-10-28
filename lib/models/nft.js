import mongoose from "mongoose";
import User from "./user";

const nftSchema = new mongoose.Schema(
  {
    transactionID: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    amount: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Successful", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Nft ||
  mongoose.model("Nft", nftSchema);
