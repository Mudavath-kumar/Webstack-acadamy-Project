import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../models/Booking.js';

// Initialize Razorpay (only if valid keys are provided)
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'rzp_test_demo_key') {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.log('⚠️  Razorpay not configured - running in development mode without payment integration');
}

// @desc    Create Razorpay order
// @route   POST /api/v1/payments/create-order
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    if (!razorpay) {
      return res.status(200).json({
        success: true,
        message: 'Demo mode - Razorpay not configured',
        data: {
          id: 'demo_order_' + Date.now(),
          amount: req.body.amount * 100,
          currency: 'INR',
          receipt: `booking_${req.body.bookingId}`,
        },
        key: process.env.RAZORPAY_KEY_ID,
      });
    }
    
    const { amount, bookingId } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: 'INR',
      receipt: `booking_${bookingId}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      data: order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment
// @route   POST /api/v1/payments/verify
// @access  Private
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;
    
    // In demo mode, auto-approve payments
    if (!razorpay) {
      const booking = await Booking.findById(bookingId);
      if (booking) {
        booking.paymentInfo = {
          paymentId: razorpay_payment_id || 'demo_payment_' + Date.now(),
          orderId: razorpay_order_id || 'demo_order_' + Date.now(),
          signature: 'demo_signature',
          status: 'completed',
          paidAt: Date.now(),
        };
        booking.status = 'confirmed';
        await booking.save();
      }
      return res.status(200).json({
        success: true,
        message: 'Demo mode - Payment auto-verified',
        data: booking,
      });
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is successful
      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found',
        });
      }

      booking.paymentInfo = {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
        status: 'completed',
        paidAt: Date.now(),
      };
      booking.status = 'confirmed';

      await booking.save();

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: booking,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment details
// @route   GET /api/v1/payments/:paymentId
// @access  Private
export const getPaymentDetails = async (req, res, next) => {
  try {
    const payment = await razorpay.payments.fetch(req.params.paymentId);

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process refund
// @route   POST /api/v1/payments/refund
// @access  Private (Admin)
export const processRefund = async (req, res, next) => {
  try {
    const { paymentId, amount } = req.body;

    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount * 100,
    });

    res.status(200).json({
      success: true,
      data: refund,
    });
  } catch (error) {
    next(error);
  }
};
