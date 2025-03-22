const jwt = require('jsonwebtoken');
const Otp = require("../../models/otp/otp");
const User = require("../../models/userModel/userModel");
const bcrypt = require('bcryptjs');

const verify = async (req, res) => {
  try {
    const { otp } = req.body;
    console.log("Received OTP:", otp);
    console.log("Cookies received:", req.cookies);

    const findOtp = await Otp.findOne({ otp: otp });
    if (findOtp) {
      const hashedPassword = await bcrypt.hash(findOtp.password, 10);

      const newUser = new User({
        name: findOtp.Username,
        email: findOtp.email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      console.log("User saved:", savedUser);

      const token = jwt.sign({ id: savedUser._id }, process.env.JWTSECRETKEY, { expiresIn: '1h' });
      console.log("Generated Token:", token);

      res.cookie('jwtToken', token, {
        httpOnly: false,
        maxAge: 3600000,
            sameSite:"None",
      secure:"true"
      });
       req.session.user_Id=savedUser._id

      console.log("Cookie set successfully!");
      res.status(200).json({ message: "Correct OTP", token: token ,user:{
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePicture: newUser.picture
      }});

    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Server error during verification" });
  }
};

module.exports = { verify };
