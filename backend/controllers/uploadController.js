import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

// @desc    Upload images
// @route   POST /api/v1/upload/images
// @access  Private
export const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image',
      });
    }

    const uploadPromises = req.files.map(async (file) => {
      // Upload to cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'homelyhub/properties',
        transformation: [
          { width: 1200, height: 800, crop: 'fill' },
          { quality: 'auto' },
        ],
      });

      // Delete local file after upload
      fs.unlinkSync(file.path);

      return result.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      data: imageUrls,
    });
  } catch (error) {
    // Clean up files on error
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    next(error);
  }
};
