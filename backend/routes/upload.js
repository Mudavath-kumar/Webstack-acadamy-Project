import express from 'express';
import { uploadImages } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Upload images
router.post('/images', protect, upload.array('images', 10), uploadImages);

export default router;
