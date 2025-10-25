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
      },
    },
  ]);

  try {
    await this.model('Property').findByIdAndUpdate(propertyId, {
      'rating.average': stats[0]?.averageRating || 0,
      'rating.count': stats[0]?.count || 0,
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
