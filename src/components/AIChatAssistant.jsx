import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

/**
 * AI Chat Assistant - Floating chatbot for property queries
 */
const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi! I\'m your HomelyHub AI assistant. How can I help you find your perfect stay today? 😊',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateAIResponse(inputMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: 'bot',
          text: botResponse,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick action buttons
  const quickActions = [
    'Show me beach properties',
    'Budget stays under ₹10000',
    'Pet-friendly options',
    'Properties with pool',
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          background: 'var(--gradient-sunset)',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-2xl)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} color="white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MessageCircle size={28} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              width: '400px',
              maxWidth: 'calc(100vw - 4rem)',
              height: '600px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-2xl)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 999,
            }}
          >
            {/* Chat Header */}
            <div
              style={{
                background: 'var(--gradient-sunset)',
                padding: '1.25rem',
                color: 'white',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                    HomelyHub AI
                  </div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                    Always ready to help
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isTyping && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'var(--primary)',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={18} color="white" />
                  </div>
                  <div
                    style={{
                      background: 'var(--bg-secondary)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-lg)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <span className="typing-dot">.</span>
                      <span className="typing-dot" style={{ animationDelay: '0.2s' }}>.</span>
                      <span className="typing-dot" style={{ animationDelay: '0.4s' }}>.</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div
                style={{
                  padding: '0 1.5rem 1rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--primary)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--bg-secondary)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputMessage.trim()}
                  style={{
                    width: '44px',
                    height: '44px',
                    background: inputMessage.trim() ? 'var(--gradient-sunset)' : 'var(--text-tertiary)',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Send size={20} color="white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .typing-dot {
          animation: typingDot 1.4s infinite;
          font-size: 1.5rem;
          line-height: 1;
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; }
          30% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

/**
 * Message Bubble Component
 */
const MessageBubble = ({ message }) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'flex-start',
        flexDirection: isBot ? 'row' : 'row-reverse',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '32px',
          height: '32px',
          background: isBot ? 'var(--primary)' : 'var(--gradient-sunset)',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isBot ? <Bot size={18} color="white" /> : <User size={18} color="white" />}
      </div>

      {/* Message Content */}
      <div
        style={{
          maxWidth: '75%',
          padding: '0.75rem 1rem',
          background: isBot ? 'var(--bg-secondary)' : 'var(--gradient-sunset)',
          color: isBot ? 'var(--text-primary)' : 'white',
          borderRadius: 'var(--radius-lg)',
          fontSize: '0.95rem',
          lineHeight: '1.5',
        }}
      >
        {message.text}
      </div>
    </motion.div>
  );
};

/**
 * Generate AI response based on user input
 */
const generateAIResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();

  // Beach properties
  if (lowerMessage.includes('beach')) {
    return 'Great choice! I found 156 beach properties for you. Check out our Beachfront category featuring stunning ocean views in Bali, Maldives, and Miami. Prices start from ₹8,000/night. Would you like to see specific locations?';
  }

  // Budget properties
  if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('under')) {
    return 'I understand you\'re looking for budget-friendly options! We have 89 properties under ₹10,000/night. Popular choices include cozy apartments in Bangkok, comfortable studios in Barcelona, and charming cottages in the countryside. Shall I show you the best deals?';
  }

  // Pet-friendly
  if (lowerMessage.includes('pet')) {
    return 'Absolutely! We have 234 pet-friendly properties where your furry friends are welcome. 🐕 These include homes with fenced yards, nearby dog parks, and pet amenities. Popular locations include California, UK countryside, and Australian beaches. Want to see the listings?';
  }

  // Pool
  if (lowerMessage.includes('pool')) {
    return 'Swimming pools are amazing! 🏊 I found 342 properties with private or shared pools. From infinity pools overlooking the ocean to heated indoor pools for winter stays. Dubai, Bali, and Mediterranean villas are our top picks. Interested in luxury or budget options?';
  }

  // Pricing
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
    return 'Our properties range from budget-friendly ₹3,000/night to luxury villas at ₹50,000+/night. The average price is around ₹12,000/night. We also offer weekly discounts (15% off) and monthly stays (25% off). What\'s your budget range?';
  }

  // Location
  if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
    return 'We have properties in 150+ destinations worldwide! Popular locations include: Bali 🏝️, Paris 🗼, Tokyo 🏯, New York 🗽, Dubai 🏙️, London 🎡, Maldives 🌴, and Swiss Alps ⛰️. Which destination interests you most?';
  }

  // Booking process
  if (lowerMessage.includes('book') || lowerMessage.includes('reserve')) {
    return 'Booking is super easy! 1️⃣ Choose your property 2️⃣ Select dates 3️⃣ Add guest count 4️⃣ Review pricing 5️⃣ Make payment. We accept all major credit cards and digital wallets. Instant confirmation guaranteed! Ready to book?';
  }

  // Cancellation
  if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
    return 'Our cancellation policy varies by property. Most offer: Free cancellation up to 48 hours before check-in, 50% refund 24-48 hours before, and no refund within 24 hours. Some properties have flexible cancellation. Check individual listings for details.';
  }

  // Amenities
  if (lowerMessage.includes('amenities') || lowerMessage.includes('facilities')) {
    return 'Popular amenities include: WiFi 📶, Kitchen 🍳, Parking 🚗, Air Conditioning ❄️, Washer/Dryer 🧺, TV 📺, Gym 💪, and Workspace 💻. Filter by amenities on the search page to find exactly what you need!';
  }

  // Default response
  return 'That\'s a great question! I can help you with: finding properties, pricing information, booking process, location recommendations, amenities, and special requirements. What would you like to know more about?';
};

export default AIChatAssistant;
