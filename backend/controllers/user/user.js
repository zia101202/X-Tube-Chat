const User = require("../../models/userModel/userModel");
const fs = require("fs");
const {
  uploadPhotoToCloudinary,
} = require("../uploadCloudinary/uploadCloudinary");
const updateUser = async (req, res) => {
  try {
    const userId = req.session.user_Id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing ❌" });
    }
    const { secure_url, public_id, message } = await uploadPhotoToCloudinary(
      req.file.path
    );

    const filePath = req.file.path;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete local file ⚠️:", err);
      } else {
        console.log("Local file deleted successfully ✅");
      }
    });

    const { nickname, dob, education, resident, bio } = req.body;

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Correct way to pass ID
      { nickname, picture: secure_url, dob, education, resident, bio }, // Updated fields
      { new: true, runValidators: true } // Return updated document & validate
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found ❌" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully ✅", user: updatedUser });
  } catch (error) {
    console.error("Error updating user ⚠️:", error);
    res.status(500).json({ error: "Internal Server Error ❌" });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json({
       users,
    }); // Send users as JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch users.",
      error: error.message,
    }); // Send error response
  }
};



module.exports = { updateUser,getAllUsers };
