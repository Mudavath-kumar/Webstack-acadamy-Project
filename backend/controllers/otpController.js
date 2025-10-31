import OTP from '../models/OTP.js';
import Booking from '../models/Booking.js';

// @desc    Generate OTP for booking confirmation
// @route   POST /api/v1/otp/generate
// @access  Private
export const generateOTP = async (req, res, next) => {
  try {
    const { bookingId, purpose = 'booking_confirmation' } = req.body;

    // Verify booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking',
      });
    }

    // Delete any existing OTPs for this booking
    await OTP.deleteMany({ booking: bookingId, verified: false });

    // Generate new OTP
    const otpCode = OTP.generateOTP();

    const otp = await OTP.create({
      booking: bookingId,
      user: req.user.id,
      otp: otpCode,
      purpose,
    });

    // In production, send OTP via SMS/Email
    // For now, return it in response (FOR DEVELOPMENT ONLY)
    console.log(`OTP for booking ${bookingId}: ${otpCode}`);

    res.status(200).json({
      success: true,
      message: 'OTP generated successfully. Check your email/SMS.',
      data: {
        otpId: otp._id,
        expiresAt: otp.expiresAt,
        // Remove this in production - only for development
        otp: process.env.NODE_ENV === 'development' ? otpCode : undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP
// @route   POST /api/v1/otp/verify
// @access  Private
export const verifyOTP = async (req, res, next) => {
  try {
    const { bookingId, otp: inputOTP } = req.body;

    if (!inputOTP || !bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide booking ID and OTP',
      });
    }

    // Find the OTP
    const otpRecord = await OTP.findOne({
      booking: bookingId,
      user: req.user.id,
      verified: false,
    }).sort('-createdAt');

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: 'OTP not found or already verified',
      });
    }

    // Verify OTP
    try {
      const isValid = otpRecord.verifyOTP(inputOTP);

      if (isValid) {
        await otpRecord.save();

        // Update booking status based on purpose
        const booking = await Booking.findById(bookingId);
        
        if (otpRecord.purpose === 'booking_confirmation') {
          booking.status = 'confirmed';
          booking.paymentStatus = 'paid';
        }

        await booking.save();

        res.status(200).json({
          success: true,
          message: 'OTP verified successfully',
          data: {
            booking,
            verified: true,
          },
        });
      } else {
        await otpRecord.save(); // Save attempt count

        const attemptsLeft = 3 - otpRecord.attempts;
        res.status(400).json({
          success: false,
          message: `Invalid OTP. ${attemptsLeft} attempt(s) remaining.`,
          attemptsLeft,
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Resend OTP
// @route   POST /api/v1/otp/resend
// @access  Private
export const resendOTP = async (req, res, next) => {
  try {
    const { bookingId, purpose = 'booking_confirmation' } = req.body;

    // Verify booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking',
      });
    }

    // Delete old OTPs
    await OTP.deleteMany({ booking: bookingId, verified: false });

    // Generate new OTP
    const otpCode = OTP.generateOTP();

    const otp = await OTP.create({
      booking: bookingId,
      user: req.user.id,
      otp: otpCode,
      purpose,
    });

    console.log(`Resent OTP for booking ${bookingId}: ${otpCode}`);

    res.status(200).json({
      success: true,
      message: 'OTP resent successfully',
      data: {
        otpId: otp._id,
        expiresAt: otp.expiresAt,
        // Remove this in production
        otp: process.env.NODE_ENV === 'development' ? otpCode : undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};
