import mongoose from "mongoose";

const buyCryptoSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
    },
    senderPhone: {
      type: Number,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
    receiverEmail: {
      type: String,
      required: true,
    },
    receiverPhone: {
      type: Number,
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.BuyCrypto ||
  mongoose.model("BuyCrypto", buyCryptoSchema);
