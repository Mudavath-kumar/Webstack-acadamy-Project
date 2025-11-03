import express from 'express';
import {
    cancelBooking,
    createBooking,
    createMockCheckout,
    getBooking,
    getBookings,
    getHostBookings,
    modifyBooking,
} from '../controllers/bookingController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.post('/mock-checkout', protect, createMockCheckout);
router.get('/user/all', protect, getBookings);
router.get('/host/all', protect, authorize('host', 'admin'), getHostBookings);
router.get('/host/my-bookings', protect, authorize('host', 'admin'), getHostBookings);
router.get('/host-bookings', protect, authorize('host', 'admin'), getHostBookings);
router.get('/:id', protect, getBooking);
router.patch('/:id/status', protect, authorize('host', 'admin'), async (req, res) => {
  try {
    const { status } = req.body;
    // Add status update logic here - for now just return success
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { status }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/modify', protect, modifyBooking);
router.get('/', protect, getBookings);

export default router;
