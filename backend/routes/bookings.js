import express from 'express';
import {
  createBooking,
  getBookings,
  getBooking,
  cancelBooking,
  getHostBookings,
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getBookings);
router.get('/host-bookings', protect, authorize('host', 'admin'), getHostBookings);
router.get('/:id', protect, getBooking);
router.put('/:id/cancel', protect, cancelBooking);

export default router;
