import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Mountain, Waves, Trees, Castle, Snowflake, Building, Tent } from 'lucide-react';

const CategoryGrid = () => {
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 'var(--spacing-lg)',
      }}
    >
      {categories.map((category, index) => (
        <Link
          key={category.id}
          to={`/category/${category.slug}`}
          style={{ textDecoration: 'none' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{
              position: 'relative',
              height: '300px',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 4px 12px var(--shadow-sm)',
            }}
          >
          {/* Background Image */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${category.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          />

          {/* Overlay */}
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
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: category.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <category.icon size={24} color="white" />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '0.25rem',
              }}
            >
              {category.name}
            </h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>
              Explore properties
            </p>
          </div>
        </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
