import Property from '../models/Property.js';

// @desc    Get all properties
// @route   GET /api/v1/properties
// @access  Public
export const getProperties = async (req, res, next) => {
  try {
    const {
      category,
      propertyType,
      city,
      minPrice,
      maxPrice,
      guests,
      bedrooms,
      amenities,
      search,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    // Build query
    let query = { status: 'active' };

    if (category) query.category = category;
    if (propertyType) query.propertyType = propertyType;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (minPrice || maxPrice) {
      query['pricing.basePrice'] = {};
      if (minPrice) query['pricing.basePrice'].$gte = Number(minPrice);
      if (maxPrice) query['pricing.basePrice'].$lte = Number(maxPrice);
    }
    if (guests) query['capacity.guests'] = { $gte: Number(guests) };
    if (bedrooms) query['capacity.bedrooms'] = { $gte: Number(bedrooms) };
    if (amenities) {
      const amenitiesArray = amenities.split(',');
      query.amenities = { $all: amenitiesArray };
    }
    if (search) {
      query.$text = { $search: search };
    }

    // Sort
    let sortBy = '-createdAt';
    if (sort === 'price-low') sortBy = 'pricing.basePrice';
    if (sort === 'price-high') sortBy = '-pricing.basePrice';
    if (sort === 'rating') sortBy = '-rating.average';

    // Pagination
    const skip = (page - 1) * limit;

    const properties = await Property.find(query)
      .sort(sortBy)
      .limit(Number(limit))
      .skip(skip)
      .populate('owner', 'name avatar');

    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      pages: Math.ceil(total / limit),
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property
// @route   GET /api/v1/properties/:id
// @access  Public
export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name avatar bio')
      .populate({
        path: 'reviews',
        populate: { path: 'user', select: 'name avatar' },
      });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create property
// @route   POST /api/v1/properties
// @access  Private (Host/Admin)
export const createProperty = async (req, res, next) => {
  try {
    req.body.owner = req.user.id;

    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/v1/properties/:id
// @access  Private (Owner/Admin)
export const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property',
      });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property
// @route   DELETE /api/v1/properties/:id
// @access  Private (Owner/Admin)
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property',
      });
    }

    await property.remove();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my properties
// @route   GET /api/v1/properties/my-properties
// @access  Private (Host)
export const getMyProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ owner: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};
