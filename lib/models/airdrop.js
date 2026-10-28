import mongoose from "mongoose";

const airdropSchema = new mongoose.Schema({
  userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
  },

  // precise decimal token amount
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },

    // mining rate in percentage
    miningRate: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },

    // launch timestamp
    launchDate: {
      type: Date,
      required: true,
    },

    // stored duration (optional but useful)
    minedDuration: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 0 },
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.models.Airdrop || mongoose.model("Airdrop", airdropSchema);
