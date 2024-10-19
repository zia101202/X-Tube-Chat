const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  reason: {
    type: String,
    enum: ['inappropriate', 'spam', 'copyright', 'other'],
    required: true,
  },
  details: {
    type: String,
  },
  reportDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending',
  },
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
