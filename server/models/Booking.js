import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    checkIn: {
      type: Date,
      required: [true, 'Please provide check-in date'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Please provide check-out date'],
    },
    guests: {
      adults: {
        type: Number,
        required: true,
        min: [1, 'Must have at least 1 adult'],
      },
      children: {
        type: Number,
        default: 0,
      },
      infants: {
        type: Number,
        default: 0,
      },
      pets: {
        type: Number,
        default: 0,
      },
    },
    totalGuests: {
      type: Number,
      required: true,
    },
    nights: {
      type: Number,
      required: true,
    },
    pricing: {
      basePrice: {
        type: Number,
        required: true,
      },
      cleaningFee: {
        type: Number,
        default: 0,
      },
      serviceFee: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: 'INR',
      },
    },
    paymentInfo: {
      paymentId: String,
      orderId: String,
      signature: String,
      method: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'wallet', 'other'],
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
      },
      paidAt: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
      default: 'pending',
    },
    cancellation: {
      cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      cancelledAt: Date,
      reason: String,
      refundAmount: Number,
      refundStatus: {
        type: String,
        enum: ['pending', 'processed', 'rejected'],
      },
    },
    specialRequests: {
      type: String,
      maxlength: [500, 'Special requests cannot exceed 500 characters'],
    },
    guestInfo: {
      name: String,
      email: String,
      phone: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for date range queries
BookingSchema.index({ checkIn: 1, checkOut: 1 });
BookingSchema.index({ property: 1, status: 1 });
BookingSchema.index({ user: 1, status: 1 });

// Validate check-out is after check-in
BookingSchema.pre('save', function (next) {
  if (this.checkOut <= this.checkIn) {
    next(new Error('Check-out date must be after check-in date'));
  }
  next();
});

export default mongoose.model('Booking', BookingSchema);
