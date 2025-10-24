import { Message, Conversation } from '../models/Message.js';

// @desc    Create or get conversation
// @route   POST /api/v1/messages/conversation
// @access  Private
export const createConversation = async (req, res, next) => {
  try {
    const { participantId, propertyId, bookingId } = req.body;

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, participantId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user.id, participantId],
        property: propertyId,
        booking: bookingId,
      });
    }

    res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user conversations
// @route   GET /api/v1/messages/conversations
// @access  Private
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    })
      .populate('participants', 'name avatar')
      .populate('property', 'title images')
      .sort('-updatedAt');

    res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message
// @route   POST /api/v1/messages
// @access  Private
export const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, receiverId, content } = req.body;

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user.id,
      receiver: receiverId,
      content,
    });

    // Update conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        content,
        sender: req.user.id,
        sentAt: Date.now(),
      },
    });

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get messages in conversation
// @route   GET /api/v1/messages/conversation/:conversationId
// @access  Private
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversationId,
    })
      .populate('sender', 'name avatar')
      .sort('createdAt');

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read
// @route   PUT /api/v1/messages/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    if (message.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    message.isRead = true;
    message.readAt = Date.now();
    await message.save();

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};
