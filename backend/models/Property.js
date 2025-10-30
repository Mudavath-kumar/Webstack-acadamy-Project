import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    propertyType: {
      type: String,
      required: [true, 'Please specify property type'],
      enum: ['house', 'apartment', 'villa', 'cabin', 'condo', 'hotel', 'other'],
    },
    category: {
      type: String,
      required: [true, 'Please specify category'],
      enum: [
        'beachfront',
        'cabins',
        'mountain',
        'luxury',
        'ski-in-out',
        'city',
        'countryside',
        'camping',
        'other',
      ],
    },
    location: {
      address: {
        type: String,
        required: [true, 'Please add an address'],
      },
      city: {
        type: String,
        required: [true, 'Please add a city'],
      },
      state: String,
      country: {
        type: String,
        required: [true, 'Please add a country'],
      },
      zipCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    pricing: {
      basePrice: {
        type: Number,
        required: [true, 'Please add base price per night'],
        min: [0, 'Price cannot be negative'],
      },
      currency: {
        type: String,
        default: 'INR',
      },
      cleaningFee: {
        type: Number,
        default: 0,
      },
      serviceFee: {
        type: Number,
        default: 0,
      },
      weeklyDiscount: {
        type: Number,
        default: 0,
        max: [100, 'Discount cannot exceed 100%'],
      },
      monthlyDiscount: {
        type: Number,
        default: 0,
        max: [100, 'Discount cannot exceed 100%'],
      },
    },
    capacity: {
      guests: {
        type: Number,
        required: [true, 'Please specify max guests'],
        min: [1, 'Must accommodate at least 1 guest'],
      },
      bedrooms: {
        type: Number,
        required: [true, 'Please specify number of bedrooms'],
        min: [0, 'Bedrooms cannot be negative'],
      },
      beds: {
        type: Number,
        required: [true, 'Please specify number of beds'],
        min: [1, 'Must have at least 1 bed'],
      },
      bathrooms: {
        type: Number,
        required: [true, 'Please specify number of bathrooms'],
        min: [1, 'Must have at least 1 bathroom'],
      },
    },
    amenities: [
      {
        type: String,
        enum: [
          'wifi',
          'kitchen',
          'parking',
          'pool',
          'hot-tub',
          'gym',
          'air-conditioning',
          'heating',
          'tv',
          'washer',
          'dryer',
          'pet-friendly',
          'smoking-allowed',
          'wheelchair-accessible',
          'elevator',
          'fireplace',
          'balcony',
          'garden',
          'beach-access',
          'ski-in-out',
          'workspace',
        ],
      },
    ],
    images: [
      {
        public_id: String,
        url: {
          type: String,
          required: true,
        },
        caption: String,
      },
    ],
    rules: {
      checkIn: {
        type: String,
        default: '15:00',
      },
      checkOut: {
        type: String,
        default: '11:00',
      },
      cancellationPolicy: {
        type: String,
        enum: ['flexible', 'moderate', 'strict', 'super-strict'],
        default: 'flexible',
      },
      additionalRules: [String],
    },
    availability: {
      instantBook: {
        type: Boolean,
        default: false,
      },
      minNights: {
        type: Number,
        default: 1,
      },
      maxNights: {
        type: Number,
        default: 365,
      },
      blockedDates: [Date],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot be more than 5'],
      },
      count: {
        type: Number,
        default: 0,
      },
      distribution: {
        5: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        1: { type: Number, default: 0 },
      },
      categories: {
        cleanliness: { type: Number, default: 0 },
        accuracy: { type: Number, default: 0 },
        checkin: { type: Number, default: 0 },
        communication: { type: Number, default: 0 },
        location: { type: Number, default: 0 },
        value: { type: Number, default: 0 },
      },
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'inactive', 'suspended'],
      default: 'draft',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    bookingsCount: {
      type: Number,
      default: 0,
    },
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    favoriteCount: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create index for text search
PropertySchema.index({ title: 'text', description: 'text', 'location.city': 'text' });

// Create index for location queries
PropertySchema.index({ 'location.coordinates': '2dsphere' });

// Virtual for reviews
PropertySchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'property',
  justOne: false,
});

// Virtual for bookings
PropertySchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'property',
  justOne: false,
});

export default mongoose.model('Property', PropertySchema);
