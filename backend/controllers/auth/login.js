const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel/userModel'); // Path to User model
const dotenv = require('dotenv');

dotenv.config(); // For environment variables

const login = async (req, res) => {
    console.log('login');
  try {
    const { email, password } = req.body;
console.log(email);
console.log(password);
    // Check if email is provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    console.log(user);
    // If user is not found
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
console.log(isMatch);
    // If password is incorrect
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWTSECRETKEY, { expiresIn: '1h' });
console.log(token);
    // Set JWT token as an HTTP-only cookie
    res.cookie('jwtToken', token, {
      httpOnly: false, 
      maxAge: 3600000, 
             sameSite:"None"
    });

    res.status(200).json({ message: 'Login successful', token,user:{
      userId: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.picture
    } });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
