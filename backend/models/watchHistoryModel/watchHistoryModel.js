const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  watchDate: {
    type: Date,
    default: Date.now,
  },
});

const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema);
module.exports = WatchHistory;
