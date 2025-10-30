import express from 'express';
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  checkFavorite,
  trackShare,
} from '../controllers/favoriteController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Favorites routes
router.get('/', protect, getFavorites);
router.post('/:propertyId', protect, addToFavorites);
router.delete('/:propertyId', protect, removeFromFavorites);
router.get('/check/:propertyId', protect, checkFavorite);

export default router;
