const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  commentId: {
    type: mongoose.Schema.ObjectId,
    ref: "Comment",
    required: true,
  },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  video: {
    // New field to reference the Video model
    type: mongoose.Schema.ObjectId,
    ref: "Video",
    required: true,
  },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  replies: [{type:mongoose.Schema.ObjectId,ref:"ReplyComment"}],
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);
const ReplyComment = mongoose.model("ReplyComment", ReplySchema);
module.exports = {Comment,ReplyComment};
