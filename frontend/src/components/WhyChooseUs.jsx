import { motion } from 'framer-motion';
import { Clock, DollarSign, Shield, Zap } from 'lucide-react';
import MotionWrapper from './MotionWrapper';

const WhyChooseUs = () => {
  const features = [
    {
      icon: DollarSign,
      title: 'Affordable Prices',
      description: 'Best rates guaranteed with transparent pricing and no hidden fees',
      color: '#10b981',
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book instantly and get confirmation in seconds, no waiting',
      color: '#f59e0b',
    },
    {
      icon: Shield,
      title: 'Trusted Hosts',
      description: 'All hosts are verified and rated by our community',
      color: '#3b82f6',
    },
    {
      icon: Clock,
      title: 'Easy Cancellations',
      description: 'Flexible cancellation policies for peace of mind',
      color: '#8b5cf6',
    },
  ];

  return (
    <section className="container section">
      <MotionWrapper>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            Why Choose HomelyHub?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            We make booking your perfect stay simple, secure, and satisfying
          </p>
        </div>
      </MotionWrapper>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--spacing-xl)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {features.map((feature, index) => (
          <MotionWrapper key={index} delay={index * 0.1}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card"
              style={{
                textAlign: 'center',
                padding: 'var(--spacing-xl)',
                height: '100%',
              }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                style={{
                  width: '70px',
                  height: '70px',
                  margin: '0 auto var(--spacing-lg)',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}44)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 10px 30px ${feature.color}33`,
                }}
              >
                <feature.icon size={32} color={feature.color} strokeWidth={2.5} />
              </motion.div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-sm)',
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7',
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
