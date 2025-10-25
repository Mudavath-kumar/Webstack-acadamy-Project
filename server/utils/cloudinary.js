import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// Upload image to Cloudinary
export const uploadImage = async (filePath, folder = 'homelyhub') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    // Delete file from local storage
    fs.unlinkSync(filePath);

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    // Delete file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

// Delete image from Cloudinary
export const deleteImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    return true;
  } catch (error) {
    throw new Error(`Image deletion failed: ${error.message}`);
  }
};

// Upload multiple images
export const uploadMultipleImages = async (files, folder = 'homelyhub') => {
  try {
    const uploadPromises = files.map((file) => uploadImage(file.path, folder));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    throw new Error(`Multiple image upload failed: ${error.message}`);
  }
};
