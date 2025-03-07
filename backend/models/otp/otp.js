const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
  
  },
  password: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes
  },
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
