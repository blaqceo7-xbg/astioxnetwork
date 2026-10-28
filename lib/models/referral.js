import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    referral_link: {
      type: String,
      required: true,
    },
    total_referral: {
      type: Number,
      required: true,
    },
    active_referral: {
      type: Number,
      required: true,
    },
    commission: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Referral ||
  mongoose.model("Referral", referralSchema);
