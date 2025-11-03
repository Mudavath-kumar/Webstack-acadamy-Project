import { motion } from 'framer-motion';

const shimmer = {
  animate: {
    backgroundPosition: ['-200% 0', '200% 0'],
  },
  transition: {
    duration: 2,
    ease: 'linear',
    repeat: Infinity,
  },
};

const ListingCardSkeleton = () => {
  return (
    <motion.div
      className="card"
      style={{ padding: 0, overflow: 'hidden' }}
      aria-hidden
    >
      <motion.div
        className="skeleton" 
        style={{ height: '220px' }}
        {...shimmer}
      />

      <div style={{ padding: '1.125rem', display: 'grid', gap: '0.9rem' }}>
        <motion.div
          className="skeleton"
          style={{ height: '1.25rem', width: '70%' }}
          {...shimmer}
        />
        <motion.div
          className="skeleton"
          style={{ height: '0.9rem', width: '55%' }}
          {...shimmer}
        />
        <motion.div
          className="skeleton"
          style={{ height: '0.9rem', width: '40%' }}
          {...shimmer}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <motion.div className="skeleton" style={{ flex: 1, height: '0.85rem' }} {...shimmer} />
          <motion.div className="skeleton" style={{ flex: 1, height: '0.85rem' }} {...shimmer} />
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCardSkeleton;
