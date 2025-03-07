const User = require('../../models/userModel/userModel');
const bcrypt = require('bcryptjs'); // Assuming you're using bcrypt for password hashing
const jwt = require('jsonwebtoken');
 // Path to User model
const dotenv = require('dotenv');

dotenv.config()
const newPassword = async (req, res) => {
    try {
        const email = req.session.data; // Get the user's email from the session
        const { password } = req.body; // Extract the new password from the request body

        if (!password) {
            return res.status(400).json({ message: "New password is required" });
        }

        // Find the user by their email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password with the hashed one
        user.password = hashedPassword;
        await user.save(); // Save the updated user to the database
           const token = jwt.sign({ userId: user._id }, process.env.JWTSECRETKEY, { expiresIn: '1h' });
        res.cookie('jwtToken', token, {
            httpOnly: false, 
            maxAge: 3600000, 
          });
        return res.status(200).json({ message: "Password successfully changed",user:{
            userId: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.picture
          } });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { newPassword };
