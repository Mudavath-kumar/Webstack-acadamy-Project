/**
 * AI-Powered Search Engine for HomelyHub
 * Provides intelligent search with NLP and recommendations
 */

/**
 * Parse natural language search query
 * Example: "3 bedroom beach house in Bali under 20000 with pool"
 */
export const parseNaturalLanguageQuery = (query) => {
  const filters = {
    location: null,
    minPrice: null,
    maxPrice: null,
    bedrooms: null,
    guests: null,
    amenities: [],
    propertyType: null,
    category: null,
  };

  const lowerQuery = query.toLowerCase();

  // Extract location (cities, countries)
  const locations = [
    'bali', 'paris', 'london', 'tokyo', 'new york', 'dubai', 'singapore',
    'miami', 'barcelona', 'rome', 'amsterdam', 'sydney', 'bangkok', 'istanbul',
    'maldives', 'switzerland', 'california', 'florida', 'hawaii',
  ];

  locations.forEach((loc) => {
    if (lowerQuery.includes(loc)) {
      filters.location = loc.charAt(0).toUpperCase() + loc.slice(1);
    }
  });

  // Extract number of bedrooms
  const bedroomMatch = lowerQuery.match(/(\d+)\s*(bedroom|bed|br)/i);
  if (bedroomMatch) {
    filters.bedrooms = parseInt(bedroomMatch[1]);
  }

  // Extract number of guests
  const guestMatch = lowerQuery.match(/(\d+)\s*(guest|people|person)/i);
  if (guestMatch) {
    filters.guests = parseInt(guestMatch[1]);
  }

  // Extract price range
  const priceMatch = lowerQuery.match(/(under|below|max|maximum)\s*₹?\s*(\d+)/i);
  if (priceMatch) {
    filters.maxPrice = parseInt(priceMatch[2]);
  }

  const minPriceMatch = lowerQuery.match(/(over|above|min|minimum)\s*₹?\s*(\d+)/i);
  if (minPriceMatch) {
    filters.minPrice = parseInt(minPriceMatch[2]);
  }

  // Extract amenities
  const amenitiesKeywords = {
    pool: ['pool', 'swimming'],
    wifi: ['wifi', 'internet'],
    parking: ['parking', 'garage'],
    kitchen: ['kitchen'],
    airConditioning: ['ac', 'air conditioning', 'aircon'],
    washer: ['washer', 'laundry'],
    gym: ['gym', 'fitness'],
    petFriendly: ['pet', 'dog', 'cat'],
  };

  Object.entries(amenitiesKeywords).forEach(([amenity, keywords]) => {
    if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
      filters.amenities.push(amenity);
    }
  });

  // Extract property type
  const propertyTypes = {
    house: ['house', 'home'],
    apartment: ['apartment', 'flat', 'condo'],
    villa: ['villa'],
    cabin: ['cabin', 'cottage'],
    hotel: ['hotel'],
  };

  Object.entries(propertyTypes).forEach(([type, keywords]) => {
    if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
      filters.propertyType = type;
    }
  });

  // Extract category
  const categories = {
    beachfront: ['beach', 'ocean', 'sea', 'waterfront'],
    mountain: ['mountain', 'alpine', 'ski'],
    city: ['city', 'urban', 'downtown'],
    luxury: ['luxury', 'premium', 'high-end'],
    countryside: ['countryside', 'rural', 'farm'],
  };

  Object.entries(categories).forEach(([category, keywords]) => {
    if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
      filters.category = category;
    }
  });

  return filters;
};

/**
 * AI-powered property recommendations based on user preferences
 */
export const getAIRecommendations = (userPreferences, properties) => {
  const scored = properties.map((property) => {
    let score = 0;

    // Score based on past bookings
    if (userPreferences.pastLocations?.includes(property.location)) {
      score += 20;
    }

    // Score based on price range preference
    if (userPreferences.priceRange) {
      const [min, max] = userPreferences.priceRange;
      if (property.price >= min && property.price <= max) {
        score += 30;
      }
    }

    // Score based on amenities preference
    if (userPreferences.preferredAmenities) {
      const matchingAmenities = property.amenities?.filter((a) =>
        userPreferences.preferredAmenities.includes(a)
      ).length || 0;
      score += matchingAmenities * 10;
    }

    // Score based on property type
    if (userPreferences.preferredTypes?.includes(property.type)) {
      score += 25;
    }

    // Score based on ratings (high ratings get bonus)
    if (property.rating >= 4.8) {
      score += 15;
    }

    // Score based on category
    if (userPreferences.preferredCategories?.includes(property.category)) {
      score += 20;
    }

    return { ...property, recommendationScore: score };
  });

  // Sort by score and return top recommendations
  return scored.sort((a, b) => b.recommendationScore - a.recommendationScore);
};

/**
 * Smart search with autocomplete suggestions
 */
export const getSearchSuggestions = (query) => {
  const suggestions = [];

  // Popular searches
  const popularSearches = [
    'Beach houses in Bali',
    'Luxury villas in Dubai',
    'Apartments in Paris',
    'Mountain cabins in Switzerland',
    'Pet-friendly homes in California',
    'Properties with pool near me',
    'Budget stays in Bangkok',
    'Family-friendly resorts in Maldives',
  ];

  // Recent searches (from localStorage)
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  // Trending destinations
  const trendingDestinations = [
    'Bali, Indonesia',
    'Paris, France',
    'Dubai, UAE',
    'Tokyo, Japan',
    'New York, USA',
    'London, UK',
  ];

  if (!query) {
    // Return popular and recent searches
    return {
      popular: popularSearches.slice(0, 4),
      recent: recentSearches.slice(0, 3),
      trending: trendingDestinations.slice(0, 4),
    };
  }

  const lowerQuery = query.toLowerCase();

  // Filter suggestions based on query
  const filtered = [
    ...popularSearches,
    ...recentSearches,
    ...trendingDestinations,
  ].filter((s) => s.toLowerCase().includes(lowerQuery));

  return {
    suggestions: filtered.slice(0, 8),
  };
};

/**
 * Save search query to history
 */
export const saveSearchQuery = (query) => {
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  
  // Add to beginning and remove duplicates
  const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 10);
  
  localStorage.setItem('recentSearches', JSON.stringify(updated));
};

/**
 * Calculate similarity score between two properties
 * Used for "Similar properties" feature
 */
export const calculateSimilarity = (property1, property2) => {
  let score = 0;

  // Same location
  if (property1.location === property2.location) score += 40;

  // Similar price range (within 20%)
  const priceDiff = Math.abs(property1.price - property2.price) / property1.price;
  if (priceDiff <= 0.2) score += 30;

  // Same category
  if (property1.category === property2.category) score += 20;

  // Similar bedrooms
  if (property1.bedrooms === property2.bedrooms) score += 10;

  return score;
};

/**
 * Get similar properties
 */
export const getSimilarProperties = (currentProperty, allProperties, count = 6) => {
  const scored = allProperties
    .filter((p) => p.id !== currentProperty.id)
    .map((p) => ({
      ...p,
      similarityScore: calculateSimilarity(currentProperty, p),
    }))
    .sort((a, b) => b.similarityScore - a.similarityScore);

  return scored.slice(0, count);
};

export default {
  parseNaturalLanguageQuery,
  getAIRecommendations,
  getSearchSuggestions,
  saveSearchQuery,
  getSimilarProperties,
  calculateSimilarity,
};
