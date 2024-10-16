// uploadController.js

const cloudinary = require('../../config/cloudinary');

const uploadFile = async (req, res) => {
  try {
    // Check if file is provided
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

 

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'uploads', // Optional folder name in Cloudinary
      }).catch((err) => {
        throw new Error('Cloudinary upload failed: ' + err.message);
        console.log(err.message)
      });
      
    // Send response with the file details
    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.secure_url,   // The URL of the uploaded file
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
};

module.exports = { uploadFile };
