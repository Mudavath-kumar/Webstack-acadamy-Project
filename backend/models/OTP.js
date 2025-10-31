import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ['booking_confirmation', 'booking_modification', 'booking_cancellation'],
      default: 'booking_confirmation',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
    attempts: {
      type: Number,
      default: 0,
      max: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Index for automatic deletion of expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Generate random 6-digit OTP
otpSchema.statics.generateOTP = function () {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Verify OTP
otpSchema.methods.verifyOTP = function (inputOTP) {
  if (this.attempts >= 3) {
    throw new Error('Maximum verification attempts exceeded');
  }

  if (this.expiresAt < new Date()) {
    throw new Error('OTP has expired');
  }

  this.attempts += 1;

  if (this.otp === inputOTP) {
    this.verified = true;
    return true;
  }

  return false;
};

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
