import express from 'express';
import { generateOTP, verifyOTP, resendOTP } from '../controllers/otpController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', protect, generateOTP);
router.post('/verify', protect, verifyOTP);
router.post('/resend', protect, resendOTP);

export default router;
