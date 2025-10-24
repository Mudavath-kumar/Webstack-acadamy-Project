import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

// Helper function to check availability
const checkAvailability = async (propertyId, checkIn, checkOut) => {
  const overlappingBookings = await Booking.find({
    property: propertyId,
    status: { $in: ['confirmed', 'pending'] },
    $or: [
      { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } },
    ],
  });

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

// @desc    Cancel booking
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

    booking.status = 'cancelled';
    booking.cancellation = {
      cancelledBy: req.user.id,
      cancelledAt: Date.now(),
      reason: req.body.reason,
    };

    await booking.save();

    res.status(200).json({
      success: true,
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
