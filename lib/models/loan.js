import mongoose from "mongoose";
import User from "./user";

const loanSchema = new mongoose.Schema(
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
    plan: {
      plan_name: {
        type: String,
      },
      plan_profit: {
        type: Number,
      },
      plan_min: {
        type: String,
      },
      plan_max: {
        type: String,
      },
      plan_duration: {
        type: Number,
      },
      plan_bonus: {
        type: Number,
      },
    },
    currency: {
      type: String,
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Successful", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Loan ||
  mongoose.model("Loan", loanSchema);
