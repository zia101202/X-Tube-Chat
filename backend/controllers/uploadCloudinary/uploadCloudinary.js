

const cloudinary = require('../../config/cloudinary');

const uploadVideoToCloudinary = async (videoPath) => {
  try {
    // Upload the file to Cloudinary as a video
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video', // Specify that the file is a video
      folder: 'uploads/videos', // Optional folder for videos
    });

    // Return the relevant details
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      message: 'Video uploaded successfully',
    };
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};

module.exports = {uploadVideoToCloudinary} ;