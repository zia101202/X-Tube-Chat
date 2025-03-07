const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  secure_url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  tags: {
    type: [String],
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  comment:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  type:{
    type: String,
  },
  
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
