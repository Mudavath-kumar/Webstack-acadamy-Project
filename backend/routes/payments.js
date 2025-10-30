import express from 'express';
import {
  createOrder,
  processPayment,
  verifyPayment,
  getPaymentDetails,
  getUserPayments,
  processRefund,
  getPaymentStats,
} from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Payment order and processing
router.post('/create-order', protect, createOrder);
router.post('/process', protect, processPayment);
router.post('/verify', protect, verifyPayment);

// Payment details and history
router.get('/my-payments', protect, getUserPayments);
router.get('/:paymentId', protect, getPaymentDetails);

// Admin routes
router.post('/refund', protect, authorize('admin', 'host'), processRefund);
router.get('/stats', protect, authorize('admin'), getPaymentStats);

export default router;
