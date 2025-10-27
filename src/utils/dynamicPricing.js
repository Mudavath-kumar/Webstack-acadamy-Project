// Dynamic Pricing Algorithm for HomelyHub
// Adjusts property prices based on multiple factors

/**
 * Calculate dynamic price for a property
 * @param {Object} property - Property object with base price and details
 * @param {Object} options - Pricing options (dates, location, demand, etc.)
 * @returns {Object} - Pricing breakdown with original and adjusted price
 */
export const calculateDynamicPrice = (property, options = {}) => {
  const {
    checkIn,
    checkOut,
    location,
    seasonalFactor = 1.0,
    demandFactor = 1.0,
    lastMinute = false,
    lengthOfStay = 1,
  } = options;

  const basePrice = property.price || property.pricePerNight || 0;
  let adjustedPrice = basePrice;
  const factors = [];

  // 1. Seasonal Pricing (25% impact)
  const seasonMultiplier = getSeasonalMultiplier(checkIn);
  if (seasonMultiplier !== 1.0) {
    adjustedPrice *= seasonMultiplier;
    factors.push({
      name: 'Seasonal Adjustment',
      multiplier: seasonMultiplier,
      impact: ((seasonMultiplier - 1) * 100).toFixed(1) + '%',
    });
  }

  // 2. Demand-Based Pricing (30% impact)
  const demandMultiplier = getDemandMultiplier(demandFactor, location);
  if (demandMultiplier !== 1.0) {
    adjustedPrice *= demandMultiplier;
    factors.push({
      name: 'Demand Adjustment',
      multiplier: demandMultiplier,
      impact: ((demandMultiplier - 1) * 100).toFixed(1) + '%',
    });
  }

  // 3. Location-Based Pricing (20% impact)
  const locationMultiplier = getLocationMultiplier(property.location || location);
  if (locationMultiplier !== 1.0) {
    adjustedPrice *= locationMultiplier;
    factors.push({
      name: 'Location Premium',
      multiplier: locationMultiplier,
      impact: ((locationMultiplier - 1) * 100).toFixed(1) + '%',
    });
  }

  // 4. Length of Stay Discount (10% impact)
  const lengthMultiplier = getLengthOfStayDiscount(lengthOfStay);
  if (lengthMultiplier !== 1.0) {
    adjustedPrice *= lengthMultiplier;
    factors.push({
      name: 'Length of Stay Discount',
      multiplier: lengthMultiplier,
      impact: ((lengthMultiplier - 1) * 100).toFixed(1) + '%',
    });
  }

  // 5. Last Minute Booking (15% impact)
  if (lastMinute) {
    const lastMinuteMultiplier = 0.85; // 15% discount for last minute
    adjustedPrice *= lastMinuteMultiplier;
    factors.push({
      name: 'Last Minute Deal',
      multiplier: lastMinuteMultiplier,
      impact: '-15%',
    });
  }

  // 6. Day of Week Pricing (10% impact)
  if (checkIn) {
    const dayMultiplier = getDayOfWeekMultiplier(checkIn);
    if (dayMultiplier !== 1.0) {
      adjustedPrice *= dayMultiplier;
      factors.push({
        name: 'Day of Week',
        multiplier: dayMultiplier,
        impact: ((dayMultiplier - 1) * 100).toFixed(1) + '%',
      });
    }
  }

  // 7. Property Features Premium
  const featuresMultiplier = getFeaturesPremium(property);
  if (featuresMultiplier !== 1.0) {
    adjustedPrice *= featuresMultiplier;
    factors.push({
      name: 'Premium Features',
      multiplier: featuresMultiplier,
      impact: ((featuresMultiplier - 1) * 100).toFixed(1) + '%',
    });
  }

  // Round to nearest whole number
  adjustedPrice = Math.round(adjustedPrice);

  // Calculate savings
  const savings = basePrice - adjustedPrice;
  const savingsPercentage = ((savings / basePrice) * 100).toFixed(0);

  return {
    originalPrice: basePrice,
    adjustedPrice,
    savings: savings > 0 ? savings : 0,
    savingsPercentage: savings > 0 ? savingsPercentage : 0,
    isDiscounted: adjustedPrice < basePrice,
    isPremium: adjustedPrice > basePrice,
    factors,
    totalNights: lengthOfStay,
    totalPrice: adjustedPrice * lengthOfStay,
    pricePerNight: adjustedPrice,
  };
};

/**
 * Get seasonal multiplier based on date
 * Peak Season (Dec-Feb, Jun-Aug): 1.3x
 * Shoulder Season (Mar-May, Sep-Nov): 1.0x
 * Off Season: 0.8x
 */
const getSeasonalMultiplier = (date) => {
  if (!date) return 1.0;

  const month = new Date(date).getMonth(); // 0-11

  // Peak Season: December (11), January (0), February (1), June (5), July (6), August (7)
  if ([11, 0, 1, 5, 6, 7].includes(month)) {
    return 1.3; // 30% increase
  }

  // Off Season: April (3), October (9)
  if ([3, 9].includes(month)) {
    return 0.85; // 15% discount
  }

  // Shoulder Season: All other months
  return 1.0; // No change
};

/**
 * Get demand multiplier based on current demand
 * High Demand: 1.4x
 * Medium Demand: 1.1x
 * Low Demand: 0.9x
 */
const getDemandMultiplier = (demandFactor, location) => {
  // If demand factor is provided, use it
  if (demandFactor > 1.5) return 1.4; // Very high demand
  if (demandFactor > 1.2) return 1.2; // High demand
  if (demandFactor > 0.8) return 1.0; // Normal demand
  return 0.9; // Low demand
};

/**
 * Get location multiplier based on city/region
 */
const getLocationMultiplier = (location) => {
  if (!location) return 1.0;

  const locationStr = location.toLowerCase();

  // Tier 1 Cities (Major Metropolitan)
  const tier1Cities = [
    'paris',
    'london',
    'new york',
    'tokyo',
    'dubai',
    'singapore',
    'hong kong',
    'san francisco',
  ];

  // Tier 2 Cities (Popular Destinations)
  const tier2Cities = [
    'bali',
    'barcelona',
    'rome',
    'amsterdam',
    'sydney',
    'miami',
    'bangkok',
    'istanbul',
  ];

  if (tier1Cities.some((city) => locationStr.includes(city))) {
    return 1.25; // 25% premium for tier 1 cities
  }

  if (tier2Cities.some((city) => locationStr.includes(city))) {
    return 1.15; // 15% premium for tier 2 cities
  }

  return 1.0; // No premium for other locations
};

/**
 * Get length of stay discount
 * 7+ nights: 15% off
 * 14+ nights: 25% off
 * 30+ nights: 35% off
 */
const getLengthOfStayDiscount = (nights) => {
  if (nights >= 30) return 0.65; // 35% discount
  if (nights >= 14) return 0.75; // 25% discount
  if (nights >= 7) return 0.85; // 15% discount
  return 1.0; // No discount
};

/**
 * Get day of week multiplier
 * Weekends (Fri-Sat): 1.2x
 * Weekdays: 1.0x
 */
const getDayOfWeekMultiplier = (date) => {
  if (!date) return 1.0;

  const day = new Date(date).getDay(); // 0 = Sunday, 6 = Saturday

  // Friday (5) and Saturday (6)
  if (day === 5 || day === 6) {
    return 1.15; // 15% weekend premium
  }

  return 1.0; // Normal weekday rate
};

/**
 * Get premium multiplier based on property features
 */
const getFeaturesPremium = (property) => {
  let premium = 1.0;

  // Check for luxury amenities
  const luxuryAmenities = property.amenities || [];
  
  if (luxuryAmenities.includes('Pool') || luxuryAmenities.includes('pool')) {
    premium += 0.05; // 5% for pool
  }

  if (luxuryAmenities.includes('Ocean View') || luxuryAmenities.includes('oceanview')) {
    premium += 0.1; // 10% for ocean view
  }

  if (luxuryAmenities.includes('Hot Tub') || luxuryAmenities.includes('hottub')) {
    premium += 0.05; // 5% for hot tub
  }

  // Check property type
  if (property.type === 'Villa' || property.category === 'Luxury') {
    premium += 0.15; // 15% for luxury properties
  }

  // Check ratings
  if (property.rating >= 4.8) {
    premium += 0.08; // 8% for highly rated properties
  }

  return premium;
};

/**
 * Get suggested pricing range for hosts
 */
export const getSuggestedPricing = (property, historicalData = {}) => {
  const basePrice = property.price || 1000;

  // Calculate prices for different scenarios
  const lowSeasonPrice = calculateDynamicPrice(property, {
    seasonalFactor: 0.8,
    demandFactor: 0.7,
    checkIn: new Date('2024-04-15'), // Off season
  });

  const highSeasonPrice = calculateDynamicPrice(property, {
    seasonalFactor: 1.3,
    demandFactor: 1.5,
    checkIn: new Date('2024-12-20'), // Peak season
  });

  const averagePrice = Math.round((lowSeasonPrice.adjustedPrice + highSeasonPrice.adjustedPrice) / 2);

  return {
    recommended: averagePrice,
    minimum: lowSeasonPrice.adjustedPrice,
    maximum: highSeasonPrice.adjustedPrice,
    competitive: {
      belowMarket: Math.round(averagePrice * 0.9),
      marketRate: averagePrice,
      aboveMarket: Math.round(averagePrice * 1.1),
    },
    insights: [
      `Your property can earn ₹${lowSeasonPrice.adjustedPrice} - ₹${highSeasonPrice.adjustedPrice} per night depending on season`,
      `Average competitive rate in your area: ₹${averagePrice}`,
      `Peak season (Dec-Feb, Jun-Aug) can command 30% premium`,
      `Offer weekly discounts to attract longer stays`,
    ],
  };
};

/**
 * Calculate total booking cost with fees
 */
export const calculateTotalCost = (pricePerNight, nights, options = {}) => {
  const {
    cleaningFee = 500,
    serviceFee = 0.12, // 12%
    taxes = 0.05, // 5%
  } = options;

  const subtotal = pricePerNight * nights;
  const serviceFeeAmount = Math.round(subtotal * serviceFee);
  const taxesAmount = Math.round((subtotal + cleaningFee + serviceFeeAmount) * taxes);
  const total = subtotal + cleaningFee + serviceFeeAmount + taxesAmount;

  return {
    pricePerNight,
    nights,
    subtotal,
    cleaningFee,
    serviceFee: serviceFeeAmount,
    taxes: taxesAmount,
    total,
    breakdown: [
      { label: `₹${pricePerNight} x ${nights} nights`, amount: subtotal },
      { label: 'Cleaning fee', amount: cleaningFee },
      { label: 'Service fee', amount: serviceFeeAmount },
      { label: 'Taxes', amount: taxesAmount },
    ],
  };
};

export default {
  calculateDynamicPrice,
  getSuggestedPricing,
  calculateTotalCost,
};
