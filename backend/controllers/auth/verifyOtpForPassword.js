const Otp = require("../../models/otp/otp");

const verifyOtpPassword = async (req, res) => {

  console.log( req.session.data);
  try {
    const { otp } = req.body;
    console.log("Received OTP:", otp);
    console.log("Cookies received:", req.cookies);

    const findOtp = await Otp.findOne({ otp: otp });
    if (findOtp) {
     
      res.status(200).json({ message: "Correct OTP" });

    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Server error during verification" });
  }
};

module.exports = { verifyOtpPassword };
