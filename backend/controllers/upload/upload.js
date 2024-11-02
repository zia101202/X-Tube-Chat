// Your current file (e.g., uploadController.js)
const {
  uploadVideoToCloudinary,
} = require("../uploadCloudinary/uploadCloudinary"); // Adjust the path as necessary
const VideoModel = require("../../models/videoModel/videoModel"); // Capitalized for convention
const UserModel = require("../../models/userModel/userModel"); // Assuming you have a user model

const uploadFile = async (req, res) => {

  try {
    // Check if file is provided
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Await the result of the upload
    const { secure_url, public_id, message } = await uploadVideoToCloudinary(
      req.file.path
    );
    const { title, description, userID } = req.body;
    console.log(userID)

    const uploadedBy=userID
    

    // Create a new video model instance
    const video = new VideoModel({
      title,
      description,
      secure_url,
      public_id,
      message,
      uploadedBy,
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
