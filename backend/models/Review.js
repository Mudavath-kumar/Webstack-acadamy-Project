import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    ratings: {
      overall: {
        type: Number,
        required: [true, 'Please provide overall rating'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
      },
      cleanliness: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
      },
      accuracy: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
      },
      checkIn: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
      },
      communication: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
      },
      location: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
      },
      value: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
      },
    },
    comment: {
      type: String,
      required: [true, 'Please add a review comment'],
      maxlength: [1000, 'Comment cannot be more than 1000 characters'],
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    hostResponse: {
      comment: String,
      respondedAt: Date,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per booking
ReviewSchema.index({ booking: 1, user: 1 }, { unique: true });

// Update property rating when review is saved
ReviewSchema.statics.calculateAverageRating = async function (propertyId) {
  const stats = await this.aggregate([
    {
      $match: { property: propertyId, isPublic: true },
    },
    {
      $group: {
        _id: '$property',
        averageRating: { $avg: '$ratings.overall' },
        count: { $sum: 1 },
        avgCleanliness: { $avg: '$ratings.cleanliness' },
        avgAccuracy: { $avg: '$ratings.accuracy' },
        avgCheckIn: { $avg: '$ratings.checkIn' },
        avgCommunication: { $avg: '$ratings.communication' },
        avgLocation: { $avg: '$ratings.location' },
        avgValue: { $avg: '$ratings.value' },
      },
    },
  ]);

  // Calculate distribution
  const distribution = await this.aggregate([
    {
      $match: { property: propertyId, isPublic: true },
    },
    {
      $group: {
        _id: '$ratings.overall',
        count: { $sum: 1 },
      },
    },
  ]);

  const distObj = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  distribution.forEach(item => {
    const rating = Math.round(item._id);
    if (rating >= 1 && rating <= 5) {
      distObj[rating] = item.count;
    }
  });

  try {
    await this.model('Property').findByIdAndUpdate(propertyId, {
      'rating.average': stats[0]?.averageRating || 0,
      'rating.count': stats[0]?.count || 0,
      'rating.distribution': distObj,
      'rating.categories.cleanliness': stats[0]?.avgCleanliness || 0,
      'rating.categories.accuracy': stats[0]?.avgAccuracy || 0,
      'rating.categories.checkin': stats[0]?.avgCheckIn || 0,
      'rating.categories.communication': stats[0]?.avgCommunication || 0,
      'rating.categories.location': stats[0]?.avgLocation || 0,
      'rating.categories.value': stats[0]?.avgValue || 0,
    });
  } catch (error) {
    console.error('Error updating property rating:', error);
  }
};

// Call calculateAverageRating after save
ReviewSchema.post('save', function () {
  this.constructor.calculateAverageRating(this.property);
});

// Call calculateAverageRating after remove
ReviewSchema.post('remove', function () {
  this.constructor.calculateAverageRating(this.property);
});

export default mongoose.model('Review', ReviewSchema);
