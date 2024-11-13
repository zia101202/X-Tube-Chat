const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
  ],
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
