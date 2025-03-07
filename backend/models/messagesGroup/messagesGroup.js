const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  createrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  groupName: {
    type: String,
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User",required:true }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
profilePath:{
  type:String,
  required:true
},

  messages: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
