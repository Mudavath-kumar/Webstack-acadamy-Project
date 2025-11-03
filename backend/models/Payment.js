import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: [true, 'Payment must be associated with a booking'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Payment must be associated with a user'],
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Payment must be associated with a property'],
    },
    amount: {
      type: Number,
      required: [true, 'Payment amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
      enum: ['card', 'upi', 'netbanking', 'wallet', 'cash', 'bank_transfer'],
      default: 'card',
    },
    paymentDetails: {
      cardLastFour: String,
      cardBrand: String,
      upiId: String,
      bankName: String,
      walletProvider: String,
      transactionId: String,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    orderId: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
    refundedAt: {
      type: Date,
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    refundReason: {
      type: String,
    },
    paymentGateway: {
      type: String,
      enum: ['stripe', 'razorpay', 'paypal', 'manual', 'demo'],
      default: 'demo',
    },
    // For Razorpay/Stripe integration (optional)
    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
    // Invoice details
    invoiceNumber: {
      type: String,
    },
    invoiceUrl: {
      type: String,
    },
    // Additional charges breakdown
    charges: {
      baseAmount: Number,
      serviceFee: Number,
      cleaningFee: Number,
      taxes: Number,
      discount: Number,
    },
    // Metadata
    metadata: {
      ipAddress: String,
      userAgent: String,
      deviceInfo: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique transaction ID
paymentSchema.pre('save', function (next) {
  if (!this.transactionId && this.status === 'completed') {
    this.transactionId = `TXN${Date.now()}${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  }
  if (!this.orderId) {
    this.orderId = `ORD${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  }
  next();
});

// Generate invoice number
paymentSchema.pre('save', function (next) {
  if (!this.invoiceNumber && this.status === 'completed') {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.invoiceNumber = `INV-${year}${month}-${random}`;
  }
  next();
});

// Indexes for faster queries
paymentSchema.index({ booking: 1 });
paymentSchema.index({ user: 1 });
paymentSchema.index({ status: 1 });
// Note: Do NOT duplicate the unique index on transactionId defined on the field above
// to avoid Mongoose duplicate index warnings.
paymentSchema.index({ createdAt: -1 });

// Virtual for payment age
paymentSchema.virtual('paymentAge').get(function () {
  if (this.paidAt) {
    return Math.floor((Date.now() - this.paidAt) / (1000 * 60 * 60 * 24)); // days
  }
  return null;
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
