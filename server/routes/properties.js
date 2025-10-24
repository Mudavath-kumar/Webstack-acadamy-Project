import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
} from '../controllers/propertyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProperties);
router.get('/my-properties', protect, authorize('host', 'admin'), getMyProperties);
router.get('/:id', getProperty);
router.post('/', protect, authorize('host', 'admin'), createProperty);
router.put('/:id', protect, authorize('host', 'admin'), updateProperty);
router.delete('/:id', protect, authorize('host', 'admin'), deleteProperty);

export default router;
