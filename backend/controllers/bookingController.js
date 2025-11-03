import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Property from '../models/Property.js';

// Helper function to check availability
const checkAvailability = async (propertyId, checkIn, checkOut, excludeBookingId = null) => {
  const query = {
    property: propertyId,
    status: { $in: ['confirmed', 'pending'] },
    $or: [
      { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } },
    ],
  };

  // Exclude current booking when modifying
  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const overlappingBookings = await Booking.find(query);

  return overlappingBookings.length === 0;
};

// @desc    Create booking
// @route   POST /api/v1/bookings
// @access  Private
export const createBooking = async (req, res, next) => {
  try {
    const { property: propertyId, checkIn, checkOut, guests, pricing } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check availability
    const isAvailable = await checkAvailability(propertyId, checkIn, checkOut);

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Property not available for selected dates',
      });
    }

    // Calculate nights
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

    const booking = await Booking.create({
      property: propertyId,
      user: req.user.id,
      host: property.owner,
      checkIn,
      checkOut,
      guests,
      totalGuests: guests.adults + guests.children,
      nights,
      pricing,
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mock checkout: compute price, mark paid, save booking and payment
// @route   POST /api/v1/bookings/mock-checkout
// @access  Private
export const createMockCheckout = async (req, res, next) => {
  try {
    const { property: propertyId, checkIn, checkOut, guests } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Check availability
    const isAvailable = await checkAvailability(propertyId, checkIn, checkOut);
    if (!isAvailable) {
      return res.status(400).json({ success: false, message: 'Property not available for selected dates' });
    }

    // Calculate nights and pricing
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const basePrice = property.pricing.basePrice;
    const subtotal = basePrice * nights;
    const serviceFee = Math.round(subtotal * 0.1);
    const cleaningFee = property.pricing.cleaningFee || 0;
    const total = subtotal + serviceFee + cleaningFee;

    // Create booking marked as paid/confirmed
    const booking = await Booking.create({
      property: propertyId,
      user: req.user.id,
      host: property.owner,
      checkIn,
      checkOut,
      guests,
      totalGuests: guests.adults + (guests.children || 0),
      nights,
      pricing: {
        basePrice,
        cleaningFee,
        serviceFee,
        total,
        currency: property.pricing.currency || 'INR',
      },
      isPaid: true,
      totalPrice: total,
      status: 'confirmed',
      paymentInfo: {
        method: 'other',
        status: 'completed',
        paidAt: new Date(),
      },
    });

    // Create a mock payment record
    const payment = await Payment.create({
      booking: booking._id,
      user: req.user.id,
      property: propertyId,
      amount: total,
      currency: property.pricing.currency || 'INR',
      paymentMethod: 'card',
      paymentDetails: {
        cardLastFour: '4242',
        cardBrand: 'VISA',
        transactionId: `MOCK-${Date.now()}`,
      },
      status: 'completed',
      paidAt: new Date(),
      paymentGateway: 'demo',
      charges: {
        baseAmount: subtotal,
        serviceFee,
        cleaningFee,
        taxes: 0,
        discount: 0,
      },
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
      notes: 'Mock payment successful',
    });

    res.status(201).json({
      success: true,
      message: 'Booking confirmed and paid',
      data: {
        booking,
        payment,
        summary: {
          propertyId,
          startDate: checkIn,
          endDate: checkOut,
          totalPrice: total,
          paymentStatus: 'paid',
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('property')
      .populate('host', 'name avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('property')
      .populate('user', 'name email phone')
      .populate('host', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check authorization
    if (
      booking.user._id.toString() !== req.user.id &&
      booking.host._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking (with OTP verification)
// @route   PUT /api/v1/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking',
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking already cancelled',
      });
    }

    // Check if cancellation is within allowed timeframe (e.g., 24 hours before check-in)
    const now = new Date();
    const checkInDate = new Date(booking.checkIn);
    const hoursUntilCheckIn = (checkInDate - now) / (1000 * 60 * 60);

    if (hoursUntilCheckIn < 24) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel booking less than 24 hours before check-in',
      });
    }

    booking.status = 'cancelled';
    booking.cancellation = {
      cancelledBy: req.user.id,
      cancelledAt: Date.now(),
      reason: req.body.reason || 'User requested cancellation',
    };

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Modify/Update booking (with OTP verification required)
// @route   PUT /api/v1/bookings/:id/modify
// @access  Private
export const modifyBooking = async (req, res, next) => {
  try {
    const { checkIn, checkOut, guests, otpVerified } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this booking',
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify cancelled booking',
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify completed booking',
      });
    }

    // Require OTP verification for modifications
    if (!otpVerified) {
      return res.status(400).json({
        success: false,
        message: 'OTP verification required to modify booking. Please verify OTP first.',
        requiresOTP: true,
      });
    }

    // If dates are being changed, check availability
    if (checkIn || checkOut) {
      const newCheckIn = checkIn ? new Date(checkIn) : booking.checkIn;
      const newCheckOut = checkOut ? new Date(checkOut) : booking.checkOut;

      // Check if new dates are available
      const isAvailable = await checkAvailability(
        booking.property,
        newCheckIn,
        newCheckOut,
        req.params.id // Exclude current booking from check
      );

      if (!isAvailable) {
        return res.status(400).json({
          success: false,
          message: 'Property not available for selected dates',
        });
      }

      booking.checkIn = newCheckIn;
      booking.checkOut = newCheckOut;

      // Recalculate nights and pricing
      const nights = Math.ceil((newCheckOut - newCheckIn) / (1000 * 60 * 60 * 24));
      booking.nights = nights;

      const property = await Property.findById(booking.property);
      const basePrice = property.pricing.basePrice;
      const subtotal = basePrice * nights;
      const serviceFee = subtotal * 0.1;
      const cleaningFee = property.pricing.cleaningFee || 0;
      const total = subtotal + serviceFee + cleaningFee;

      booking.pricing = {
        basePrice,
        nights,
        subtotal,
        serviceFee,
        cleaningFee,
        total,
      };
    }

    // Update guests if provided
    if (guests) {
      booking.guests = guests;
      booking.totalGuests = guests.adults + (guests.children || 0);
    }

    // Track modification history
    if (!booking.modifications) {
      booking.modifications = [];
    }

    booking.modifications.push({
      modifiedBy: req.user.id,
      modifiedAt: Date.now(),
      changes: {
        checkIn,
        checkOut,
        guests,
      },
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking modified successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get host bookings
// @route   GET /api/v1/bookings/host-bookings
// @access  Private (Host)
export const getHostBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ host: req.user.id })
      .populate('property')
      .populate('user', 'name avatar email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};
