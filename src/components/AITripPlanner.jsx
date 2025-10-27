import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, DollarSign, Sparkles, Send } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * AI Trip Planner Component
 * Generates smart itinerary suggestions based on preferences
 */
const AITripPlanner = () => {
  const [preferences, setPreferences] = useState({
    destination: '',
    duration: 3,
    budget: 'moderate',
    travelers: 2,
    interests: [],
  });

  const [itinerary, setItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const interestOptions = [
    'Beaches', 'Mountains', 'Culture', 'Food', 'Adventure',
    'Relaxation', 'Shopping', 'Nature', 'Nightlife', 'History',
  ];

  const handleGenerateItinerary = async () => {
    if (!preferences.destination) {
      toast.error('Please enter a destination');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const generatedItinerary = generateSmartItinerary(preferences);
      setItinerary(generatedItinerary);
      setIsGenerating(false);
      toast.success('Your personalized itinerary is ready! \ud83c\udf89');
    }, 2000);
  };

  const toggleInterest = (interest) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            width: '80px',
            height: '80px',
            background: 'var(--gradient-sunset)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: 'var(--shadow-2xl)',
          }}
        >
          <Sparkles size={40} color="white" />
        </motion.div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          AI Trip Planner
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          Let AI create your perfect travel itinerary
        </p>
      </div>

      {/* Planner Form */}
      <div
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--backdrop-blur)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          marginBottom: '2rem',
        }}
      >
        {/* Destination */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
            <MapPin size={20} />
            Destination
          </label>
          <input
            type="text"
            value={preferences.destination}
            onChange={(e) => setPreferences({ ...preferences, destination: e.target.value })}
            placeholder="e.g., Bali, Paris, Tokyo"
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              fontSize: '1rem',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Duration & Budget */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
              <Calendar size={20} />
              Duration (days)
            </label>
            <input
              type="number"
              value={preferences.duration}
              onChange={(e) => setPreferences({ ...preferences, duration: parseInt(e.target.value) })}
              min="1"
              max="30"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
              <DollarSign size={20} />
              Budget
            </label>
            <select
              value={preferences.budget}
              onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="budget">Budget (₹5000-10000/day)</option>
              <option value="moderate">Moderate (₹10000-20000/day)</option>
              <option value="luxury">Luxury (₹20000+/day)</option>
            </select>
          </div>
        </div>

        {/* Travelers */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
            <Users size={20} />
            Number of Travelers
          </label>
          <input
            type="number"
            value={preferences.travelers}
            onChange={(e) => setPreferences({ ...preferences, travelers: parseInt(e.target.value) })}
            min="1"
            max="20"
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              fontSize: '1rem',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Interests */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600' }}>
            Your Interests
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {interestOptions.map((interest) => (
              <motion.button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.5rem 1rem',
                  background: preferences.interests.includes(interest)
                    ? 'var(--gradient-sunset)'
                    : 'var(--bg-secondary)',
                  color: preferences.interests.includes(interest) ? 'white' : 'var(--text-primary)',
                  border: `2px solid ${preferences.interests.includes(interest) ? 'transparent' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >
                {interest}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={handleGenerateItinerary}
          disabled={isGenerating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: '1rem',
            background: isGenerating ? 'var(--text-tertiary)' : 'var(--gradient-sunset)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            fontWeight: '700',
            fontSize: '1.05rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {isGenerating ? (
            <>
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Itinerary
            </>
          )}
        </motion.button>
      </div>

      {/* Generated Itinerary */}
      {itinerary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--backdrop-blur)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
          }}
        >
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>
            Your Personalized Itinerary 🗺️
          </h2>

          {itinerary.days.map((day, index) => (
            <div
              key={index}
              style={{
                marginBottom: '2rem',
                paddingBottom: '2rem',
                borderBottom: index < itinerary.days.length - 1 ? '1px solid var(--border-color)' : 'none',
              }}
            >
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>
                Day {day.day}: {day.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {day.activities.map((activity, actIndex) => (
                  <li key={actIndex} style={{ display: 'flex', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', minWidth: '70px' }}>
                      {activity.time}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{activity.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Budget Estimate */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              marginTop: '2rem',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
              Estimated Budget
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Accommodation</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>₹{itinerary.budget.accommodation.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Activities</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>₹{itinerary.budget.activities.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Food</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>₹{itinerary.budget.food.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Transportation</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>₹{itinerary.budget.transportation.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>Total Estimate</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                  ₹{itinerary.budget.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

/**
 * Generate smart itinerary based on preferences
 */
const generateSmartItinerary = (preferences) => {
  const { destination, duration, budget, travelers, interests } = preferences;

  // Sample itinerary generation logic
  const days = [];
  const budgetMultipliers = { budget: 0.7, moderate: 1, luxury: 1.5 };
  const multiplier = budgetMultipliers[budget];

  for (let i = 1; i <= duration; i++) {
    const dayActivities = [];
    
    if (i === 1) {
      dayActivities.push(
        { time: '09:00', description: `Arrive in ${destination} and check into your accommodation` },
        { time: '11:00', description: 'Explore local neighborhood and grab lunch at a popular spot' },
        { time: '14:00', description: 'Visit main tourist attraction or landmark' },
        { time: '18:00', description: 'Sunset at scenic viewpoint' },
        { time: '20:00', description: 'Welcome dinner at local restaurant' }
      );
    } else if (i === duration) {
      dayActivities.push(
        { time: '08:00', description: 'Breakfast and final stroll around favorite spots' },
        { time: '10:00', description: 'Last-minute shopping for souvenirs' },
        { time: '12:00', description: 'Check out and head to airport' }
      );
    } else {
      // Generate activities based on interests
      if (interests.includes('Beaches')) {
        dayActivities.push({ time: '09:00', description: 'Morning beach relaxation and water activities' });
      }
      if (interests.includes('Culture')) {
        dayActivities.push({ time: '11:00', description: 'Visit museum or cultural site' });
      }
      if (interests.includes('Food')) {
        dayActivities.push({ time: '13:00', description: 'Food tour - try local delicacies' });
      }
      if (interests.includes('Adventure')) {
        dayActivities.push({ time: '15:00', description: 'Adventure activity (hiking, diving, etc.)' });
      }
      dayActivities.push(
        { time: '18:00', description: 'Explore local markets' },
        { time: '20:00', description: 'Dinner at recommended restaurant' }
      );
    }

    days.push({
      day: i,
      title: i === 1 ? 'Arrival & Exploration' : i === duration ? 'Departure' : 'Adventure Continues',
      activities: dayActivities,
    });
  }

  // Calculate budget
  const accommodation = 15000 * duration * multiplier;
  const food = 3000 * duration * multiplier * travelers;
  const activities = 5000 * duration * multiplier * travelers;
  const transportation = 4000 * duration * multiplier;
  const total = accommodation + food + activities + transportation;

  return {
    destination,
    duration,
    days,
    budget: {
      accommodation: Math.round(accommodation),
      food: Math.round(food),
      activities: Math.round(activities),
      transportation: Math.round(transportation),
      total: Math.round(total),
    },
  };
};

export default AITripPlanner;
