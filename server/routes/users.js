import express from 'express';
import {
  getUserProfile,
  updateProfile,
  updateAvatar,
  deleteAccount,
  getUsers,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getUsers);
router.get('/:id', getUserProfile);
router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, updateAvatar);
router.delete('/account', protect, deleteAccount);

export default router;
