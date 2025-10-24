import express from 'express';
import {
  createOrder,
  verifyPayment,
  getPaymentDetails,
  processRefund,
} from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/:paymentId', protect, getPaymentDetails);
router.post('/refund', protect, authorize('admin'), processRefund);

export default router;
