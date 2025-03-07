const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Corrected
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Corrected
  },
  messages: [
    {
      message: String,
      fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Corrected
      },
      createdAt: { type: Date, default: Date.now }, // Added default value for `createdAt`
    },
  ],
});

module.exports = mongoose.model("Messages", MessagesSchema); // Corrected export syntax




