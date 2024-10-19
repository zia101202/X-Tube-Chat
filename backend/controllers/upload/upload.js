const cloudinary = require('../../config/cloudinary');

const uploadFile = async (req, res) => {
  try {
    // Check if file is provided
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Log file details (optional for debugging purposes)
    console.log('File mimetype:', req.file.mimetype);
    console.log('File path:', req.file.path);

    // Upload the file to Cloudinary as a video, allowing all video types
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video', // Specify that the file is a video
      folder: 'uploads/videos', // Optional folder for videos
    }).catch((err) => {
      throw new Error('Cloudinary upload failed: ' + err.message);
    });

    // Send response with the file details
    res.status(200).json({
      message: 'Video uploaded successfully',
      secure_url: result.secure_url,   // The URL of the uploaded video
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).send('Error uploading video: ' + error.message);
    console.log(error);
  }
};

module.exports = { uploadFile };
