import { motion } from 'framer-motion';
import { Building, Castle, ChevronLeft, ChevronRight, Home, Mountain, Snowflake, Tent, Trees, Waves } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const categories = [
    {
      id: 1,
      name: 'Beachfront',
      slug: 'beachfront',
      icon: Waves,
      gradient: 'var(--gradient-ocean)',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    },
    {
      id: 2,
      name: 'Cabins',
      slug: 'cabins',
      icon: Trees,
      gradient: 'var(--gradient-aurora)',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
    },
    {
      id: 3,
      name: 'Mountain',
      slug: 'mountain',
      icon: Mountain,
      gradient: 'var(--gradient-sunset)',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    },
    {
      id: 4,
      name: 'Luxury',
      slug: 'luxury',
      icon: Castle,
      gradient: 'var(--gradient-paradise)',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    },
    {
      id: 5,
      name: 'Ski-in/out',
      slug: 'ski-in-out',
      icon: Snowflake,
      gradient: 'var(--gradient-warm)',
      image: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=80',
    },
    {
      id: 6,
      name: 'City',
      slug: 'city',
      icon: Building,
      gradient: 'var(--gradient-ocean)',
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
    },
    {
      id: 7,
      name: 'Countryside',
      slug: 'countryside',
      icon: Home,
      gradient: 'var(--gradient-aurora)',
      image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80',
    },
    {
      id: 8,
      name: 'Camping',
      slug: 'camping',
      icon: Tent,
      gradient: 'var(--gradient-sunset)',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll('left')}
        style={{
          position: 'absolute',
          left: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'white',
          border: '2px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ChevronLeft size={24} color="var(--text-primary)" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll('right')}
        style={{
          position: 'absolute',
          right: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'white',
          border: '2px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ChevronRight size={24} color="var(--text-primary)" />
      </motion.button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: 'var(--spacing-lg)',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '10px 0',
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            style={{ textDecoration: 'none', flexShrink: 0, width: '280px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                position: 'relative',
                height: '320px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 4px 12px var(--shadow-sm)',
              }}
            >
              {/* Background Image */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Overlay on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  style={{
                    background: 'white',
                    color: 'var(--text-primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.75rem 1.5rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  Explore →
                </motion.button>
              </motion.div>

              {/* Default Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)',
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'var(--spacing-lg)',
                  color: 'white',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-md)',
                    background: category.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <category.icon size={26} color="white" />
                </motion.div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: '700',
                    marginBottom: '0.25rem',
                  }}
                >
                  {category.name}
                </h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.95 }}>
                  Explore properties
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
