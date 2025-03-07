

const cloudinary = require('../../config/cloudinary');

const uploadVideoToCloudinary = async (videoPath) => {
  try {
    
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: "auto",
      folder: "tmp", 
    });

    
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format, 
      resource_type: result.resource_type, 
      message: "Media uploaded successfully!",
    };
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};









const uploadPhotoToCloudinary = async (photoPath) => {
  try {
    // Upload the file to Cloudinary as an image
    const result = await cloudinary.uploader.upload(photoPath, {
      folder: 'uploads/photos', // Optional folder for images
    });

    // Return the relevant details
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      message: 'Photo uploaded successfully',
    };
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};


module.exports = {uploadVideoToCloudinary,uploadPhotoToCloudinary} ;