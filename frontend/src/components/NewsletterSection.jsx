import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('🎉 Thank you for subscribing!');
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 'var(--spacing-3xl) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Shapes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 14, -8, 14, -4, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{
              display: 'inline-block',
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            <Sparkles size={48} />
          </motion.div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            📬 Stay Inspired!
          </h2>

          <p
            style={{
              fontSize: '1.1rem',
              opacity: 0.95,
              marginBottom: 'var(--spacing-2xl)',
            }}
          >
            Subscribe for exclusive offers and travel stories delivered to your inbox
          </p>

          <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'white',
                borderRadius: '50px',
                padding: '0.5rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Mail
                size={20}
                style={{
                  marginLeft: '1rem',
                  color: '#9ca3af',
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  padding: '0.75rem 0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  color: '#111827',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.75rem 1.5rem',
                  color: 'white',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? (
                  'Subscribing...'
                ) : (
                  <>
                    Subscribe
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <p
            style={{
              fontSize: '0.85rem',
              opacity: 0.8,
              marginTop: 'var(--spacing-md)',
            }}
          >
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
