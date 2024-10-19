const mongoose = require('mongoose');

const dislikeSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  dislikedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dislikeDate: {
    type: Date,
    default: Date.now,
  },
});

const Dislike = mongoose.model('Dislike', dislikeSchema);
module.exports = Dislike;
