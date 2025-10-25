import Review from '../models/Review.js';
import Booking from '../models/Booking.js';

// @desc    Create review
// @route   POST /api/v1/reviews
// @access  Private
export const createReview = async (req, res, next) => {
  try {
    const { property, booking, ratings, comment } = req.body;

    // Check if booking exists and user is authorized
    const bookingDoc = await Booking.findById(booking);

    if (!bookingDoc) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (bookingDoc.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to review this booking',
      });
    }

    if (bookingDoc.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only review completed bookings',
      });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ booking });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Review already submitted for this booking',
      });
    }

    const review = await Review.create({
      property,
      user: req.user.id,
      booking,
      ratings,
      comment,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for property
// @route   GET /api/v1/reviews/property/:propertyId
// @access  Public
export const getPropertyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      property: req.params.propertyId,
      isPublic: true,
    })
      .populate('user', 'name avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
// @access  Private
export const updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review',
      });
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review',
      });
    }

    await review.remove();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
