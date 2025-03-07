const fs = require("fs");
const {
  uploadVideoToCloudinary,
} = require("../uploadCloudinary/uploadCloudinary"); // Adjust the path as necessary
const VideoModel = require("../../models/videoModel/videoModel"); // Capitalized for convention
const UserModel = require("../../models/userModel/userModel"); // Assuming you have a user model

const uploadFile = async (req, res) => {
console.log('thisi s8888888888888888888888888888888');
  try {
    // Check if file is provided
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Await the result of the upload
    const { secure_url, public_id, message } = await uploadVideoToCloudinary(
      req.file.path
    );
console.log( req.file);
      const filePath = req.file.path;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Failed to delete local file ⚠️:", err);
          } else {
            console.log("Local file deleted successfully ✅");
          }
        });
    const { title, description, userID } = req.body;
    
    const uploadedBy=req.session.user_Id
    console.log(uploadedBy);

    // Create a new video model instance
    const video = new VideoModel({
      title,
      description,
      secure_url,
      public_id,
      message,
      uploadedBy,
     type: req.file.mimetype
    });

    // Save the video details
    await video.save();
    return res.status(200).send("Video details saved successfully.");
  } catch (error) {
    res.status(500).send("Error uploading video: " + error.message);
    console.error(error); // Use console.error for errors
  }
};

module.exports = { uploadFile };
