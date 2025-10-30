import User from '../models/User.js';
import Property from '../models/Property.js';

// @desc    Add property to favorites
// @route   POST /api/v1/favorites/:propertyId
// @access  Private
export const addToFavorites = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check if already favorited
    const user = await User.findById(userId);
    if (user.favorites.includes(propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property already in favorites',
      });
    }

    // Add to user's favorites
    user.favorites.push(propertyId);
    await user.save();

    // Add user to property's favoritedBy and increment count
    property.favoritedBy.push(userId);
    property.favoriteCount += 1;
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Added to favorites',
      data: {
        favorites: user.favorites,
        favoriteCount: property.favoriteCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove property from favorites
// @route   DELETE /api/v1/favorites/:propertyId
// @access  Private
export const removeFromFavorites = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Remove from user's favorites
    const user = await User.findById(userId);
    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== propertyId
    );
    await user.save();

    // Remove user from property's favoritedBy and decrement count
    property.favoritedBy = property.favoritedBy.filter(
      (id) => id.toString() !== userId
    );
    property.favoriteCount = Math.max(0, property.favoriteCount - 1);
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Removed from favorites',
      data: {
        favorites: user.favorites,
        favoriteCount: property.favoriteCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's favorites
// @route   GET /api/v1/favorites
// @access  Private
export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'favorites',
      match: { status: 'active' },
      populate: { path: 'owner', select: 'name avatar' },
    });

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if property is favorited
// @route   GET /api/v1/favorites/check/:propertyId
// @access  Private
export const checkFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const user = await User.findById(req.user.id);

    const isFavorited = user.favorites.includes(propertyId);

    res.status(200).json({
      success: true,
      data: { isFavorited },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Track property share
// @route   POST /api/v1/properties/:id/share
// @access  Public
export const trackShare = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    property.shareCount += 1;
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Share tracked',
      data: { shareCount: property.shareCount },
    });
  } catch (error) {
    next(error);
  }
};
