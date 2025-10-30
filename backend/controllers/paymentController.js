import crypto from 'crypto';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';

// @desc    Create payment order (MongoDB-based)
// @route   POST /api/v1/payments/create-order
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const { amount, bookingId, paymentMethod = 'card', currency = 'USD' } = req.body;

    // Validate booking
    const booking = await Booking.findById(bookingId).populate('property');
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if user owns this booking
    if (booking.guest.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to make payment for this booking',
      });
    }

    // Create payment record in MongoDB
    const payment = await Payment.create({
      booking: bookingId,
      user: req.user.id,
      property: booking.property._id,
      amount: amount,
      currency: currency,
      paymentMethod: paymentMethod,
      status: 'pending',
      paymentGateway: 'demo',
      charges: {
        baseAmount: booking.totalPrice || amount,
        serviceFee: amount * 0.05, // 5% service fee
        cleaningFee: 50,
        taxes: amount * 0.1, // 10% tax
        discount: 0,
      },
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(200).json({
      success: true,
      message: 'Payment order created successfully',
      data: {
        orderId: payment.orderId,
        paymentId: payment._id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process payment (MongoDB-based)
// @route   POST /api/v1/payments/process
// @access  Private
export const processPayment = async (req, res, next) => {
  try {
    const {
      paymentId,
      bookingId,
      paymentMethod,
      paymentDetails,
    } = req.body;

    // Find payment record
    let payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    // Verify user owns this payment
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to process this payment',
      });
    }

    // Update payment status to processing
    payment.status = 'processing';
    await payment.save();

    // Simulate payment processing (in real app, this would call payment gateway)
    // For demo purposes, we'll auto-approve after a brief delay
    setTimeout(async () => {
      try {
        payment.status = 'completed';
        payment.paidAt = Date.now();
        payment.paymentDetails = paymentDetails || {
          cardLastFour: '4242',
          cardBrand: 'Visa',
        };
        await payment.save();

        // Update booking status
        const booking = await Booking.findById(bookingId);
        if (booking) {
          booking.paymentInfo = {
            paymentId: payment.transactionId,
            orderId: payment.orderId,
            status: 'completed',
            paidAt: payment.paidAt,
          };
          booking.status = 'confirmed';
          booking.isPaid = true;
          await booking.save();
        }
      } catch (error) {
        console.error('Payment processing error:', error);
      }
    }, 1000);

    res.status(200).json({
      success: true,
      message: 'Payment is being processed',
      data: {
        paymentId: payment._id,
        orderId: payment.orderId,
        status: payment.status,
        transactionId: payment.transactionId,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment status
// @route   POST /api/v1/payments/verify
// @access  Private
export const verifyPayment = async (req, res, next) => {
  try {
    const { paymentId, bookingId } = req.body;

    // Find payment record
    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    // Verify user owns this payment
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to verify this payment',
      });
    }

    // Update booking if payment is completed
    if (payment.status === 'completed') {
      const booking = await Booking.findById(bookingId);
      if (booking) {
        booking.paymentInfo = {
          paymentId: payment.transactionId,
          orderId: payment.orderId,
          status: 'completed',
          paidAt: payment.paidAt,
        };
        booking.status = 'confirmed';
        booking.isPaid = true;
        await booking.save();

        return res.status(200).json({
          success: true,
          message: 'Payment verified successfully',
          data: {
            payment,
            booking,
          },
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Payment status retrieved',
      data: {
        payment,
        status: payment.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment details
// @route   GET /api/v1/payments/:paymentId
// @access  Private
export const getPaymentDetails = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .populate('user', 'name email')
      .populate('property', 'title location')
      .populate('booking');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    // Check authorization
    if (
      payment.user._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this payment',
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user payment history
// @route   GET /api/v1/payments/my-payments
// @access  Private
export const getUserPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .populate('property', 'title location images')
      .populate('booking', 'checkIn checkOut guests')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process refund
// @route   POST /api/v1/payments/refund
// @access  Private (Admin or Property Owner)
export const processRefund = async (req, res, next) => {
  try {
    const { paymentId, amount, reason } = req.body;

    const payment = await Payment.findById(paymentId).populate('booking');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    // Check if payment is completed
    if (payment.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Only completed payments can be refunded',
      });
    }

    // Check if already refunded
    if (payment.status === 'refunded') {
      return res.status(400).json({
        success: false,
        message: 'Payment already refunded',
      });
    }

    // Process refund
    const refundAmount = amount || payment.amount;

    if (refundAmount > payment.amount) {
      return res.status(400).json({
        success: false,
        message: 'Refund amount cannot exceed payment amount',
      });
    }

    payment.status = 'refunded';
    payment.refundAmount = refundAmount;
    payment.refundedAt = Date.now();
    payment.refundReason = reason || 'Booking cancelled';
    await payment.save();

    // Update booking status
    if (payment.booking) {
      const booking = await Booking.findById(payment.booking);
      if (booking) {
        booking.status = 'cancelled';
        booking.paymentInfo.status = 'refunded';
        await booking.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        payment,
        refundAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment statistics (Admin)
// @route   GET /api/v1/payments/stats
// @access  Private (Admin)
export const getPaymentStats = async (req, res, next) => {
  try {
    const stats = await Payment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const totalPayments = await Payment.countDocuments();
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const recentPayments = await Payment.find()
      .sort('-createdAt')
      .limit(10)
      .populate('user', 'name email')
      .populate('property', 'title');

    res.status(200).json({
      success: true,
      data: {
        stats,
        totalPayments,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentPayments,
      },
    });
  } catch (error) {
    next(error);
  }
};
