import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Define the kyc schema
const kycSchema = new mongoose.Schema(
  {
    kycname: {
      type: String,
      unique: true,
      required: [true, "kycname is required"],
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    status: {
      type: String,
      default: "Unapproved",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    balance: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    withdrawal: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    deposit: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    earnings: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    active_deposit: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    total_deposit: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    total_withdrawal: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    total_referral: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    active_referral: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    commissions: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    total_referral: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} must be an integer!`,
      },
    },
    connect_wallet_phrase: {
      type: String,
      maxlength: 100,
    },
    connect_wallet_type: {
      type: String,
    },
    referral_link: {
      type: String,
    },
    gender: {
      type: Array,
      default: ["Male"],
    },
    role: {
      type: String,
      enum: {
        values: ["kyc", "admin"],
      },
      default: "kyc",
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Middleware for Password Hashing
kycSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = 10;
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// FILTER ALL VERIFIED kyc EMAIL ADDRESS
kycSchema.pre(/^find/, function (next) {
  this.find({ isEmailVerified: { $ne: true } });
  next();
});

// FILTER ALL ACTIVE kyc ACCOUNT
kycSchema.pre(/^find/, function (next) {
  this.find({ status: { $ne: "Inactive" } });
  next();
});

// Method to verify password
kycSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT
kycSchema.methods.generateToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
     expiresIn: '1d', // Token expires in 1 day
   });
};

kycSchema.methods.getDashboardInfo = function () {
  return {
    id: this._id,
    kycname: this.kycname,
    bio: this.bio,
    views: this.views,
    likes: this.likes,
    img: this.img,
    category: this.category,
    country: this.country,
    gender: this.gender,
    state: this.state,
    city: this.city,
    rating: this.rating,
    photos: this.photos,
    isSubscribed: this.isSubscribed,
    subStartAt: this.subStartAt,
    subEndAt: this.subEndAt,
    email: this.email,
    status: this.status,
    isFree: this.isFree,
    balance: this.balance,
    withdrawal: this.withdrawal,
    ticketPrice: this.ticketPrice,
    isCelebVerified: this.isCelebVerified,
    role: this.role,
    whatsAppNumber: this.whatsAppNumber,
  };
};

// Method to get kyc profile info
kycSchema.methods.getProfileInfo = function () {
  return {
    id: this._id,
    kycname: this.kycname,
    bio: this.bio,
    views: this.views,
    likes: this.likes,
    img: this.img,
    email: this.email,
    category: this.category,
    country: this.country,
    gender: this.gender,
    state: this.state,
    photos: this.photos,
    city: this.city,
    isCelebVerified: this.isCelebVerified,
    isSubscribed: this.isSubscribed,
    subStartAt: this.subStartAt,
    subEndAt: this.subEndAt,
    rating: this.rating,
    status: this.status,
    isFree: this.isFree,
    ticketPrice: this.ticketPrice,
    role: this.role,
  };
};

// Method to get account info
kycSchema.methods.getAccountInfo = function () {
  return {
    wallet_type: this.wallet_type,
    wallet_phrase: this.wallet_phrase,
    balance: this.balance,
    deposit: this.deposit,
    profit: this.profit,
    reward: this.reward,
    withdrawal: this.withdrawal,
  };
};

// Export the Kyc model
const Kyc = mongoose.models.Kyc || mongoose.model('Kyc', kycSchema);
export default Kyc;
