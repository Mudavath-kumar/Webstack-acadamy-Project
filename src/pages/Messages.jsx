import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Image, Paperclip } from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Looking forward to your stay!',
      time: '10:30 AM',
      unread: 2,
      property: 'Luxury Beachfront Villa',
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'Thank you for your hospitality',
      time: 'Yesterday',
      unread: 0,
      property: 'Mountain Retreat',
    },
  ];

  const messages = [
    { id: 1, sender: 'host', text: 'Hi! Welcome to HomelyHub. How can I help you?', time: '10:15 AM' },
    { id: 2, sender: 'guest', text: 'Hello! I have a question about check-in time.', time: '10:20 AM' },
    { id: 3, sender: 'host', text: 'Of course! Check-in is at 3 PM. Looking forward to your stay!', time: '10:30 AM' },
  ];

  return (
    <div style={{ paddingTop: '80px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '350px 1fr', height: 'calc(100vh - 80px)' }}>
        {/* Chat List */}
        <div style={{ borderRight: '1px solid var(--border-color)', overflowY: 'auto' }}>
          <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700' }}>Messages</h2>
          </div>
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ background: 'var(--bg-secondary)' }}
              onClick={() => setSelectedChat(chat.id)}
              style={{
                padding: 'var(--spacing-lg)',
                cursor: 'pointer',
                background: selectedChat === chat.id ? 'var(--bg-secondary)' : 'transparent',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <img src={chat.avatar} alt={chat.name} style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-full)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{chat.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{chat.time}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {chat.lastMessage}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{chat.property}</p>
                </div>
                {chat.unread > 0 && (
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                    {chat.unread}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chat Window */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <img src={chats[0].avatar} alt={chats[0].name} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)' }} />
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '1rem' }}>{chats[0].name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{chats[0].property}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-lg)' }}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'guest' ? 'flex-end' : 'flex-start',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                <div
                  style={{
                    maxWidth: '60%',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    background: msg.sender === 'guest' ? 'var(--primary)' : 'var(--bg-secondary)',
                    color: msg.sender === 'guest' ? 'white' : 'var(--text-primary)',
                  }}
                >
                  <p style={{ marginBottom: '0.25rem' }}>{msg.text}</p>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{msg.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <Image size={20} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <Paperclip size={20} />
              </motion.button>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input"
                style={{ flex: 1 }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Send size={18} />
                Send
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
