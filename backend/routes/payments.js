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

// Host earnings routes
router.get('/host/earnings', protect, authorize('host'), async (req, res) => {
  try {
    // For now, return mock data - you can implement actual logic later
    res.json({
      success: true,
      data: {
        totalEarnings: 0,
        monthlyEarnings: 0,
        pendingEarnings: 0,
        availableEarnings: 0,
        monthlyBreakdown: []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/host/transactions', protect, authorize('host'), async (req, res) => {
  try {
    // For now, return empty array - you can implement actual logic later
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin routes
router.post('/refund', protect, authorize('admin', 'host'), processRefund);
router.get('/stats', protect, authorize('admin'), getPaymentStats);

export default router;
