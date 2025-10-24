import express from 'express';
import {
  createConversation,
  getConversations,
  sendMessage,
  getMessages,
  markAsRead,
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/conversation', protect, createConversation);
router.get('/conversations', protect, getConversations);
router.post('/', protect, sendMessage);
router.get('/conversation/:conversationId', protect, getMessages);
router.put('/:id/read', protect, markAsRead);

export default router;
