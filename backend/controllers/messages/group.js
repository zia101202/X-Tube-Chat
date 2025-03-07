const Group = require("../../models/messagesGroup/messagesGroup");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const CreateGroup = async (req, res) => {
  const { createrId, groupName, members } = req.body;
  const { path } = req.file;
  const membersStr = JSON.parse(members);
  try {
    const NewGroup = new Group({
      createrId,
      groupName,
      members: membersStr,
      profilePath: path,
    });
    await NewGroup.save();
    res.status(201).json(NewGroup);
  } catch (error) {
    console.log(error);
  }
};

const getAllGroups = async (req, res) => {
  const { userId } = req.query;
  userId;
  try {
    const groupsAdmin = await Group.find({ createrId: userId })
      .populate("members")
      .populate("createrId")
      .populate({
        path: "messages",
        populate: {
          path: "userId",
        },
      });
    const groupsMember = await Group.find({ members: userId })
      .populate("members")
      .populate("createrId")
      .populate({
        path: "messages",
        populate: {
          path: "userId",
        },
      });

    res.status(201).json({
      data: {
        groupsAdmin,
        groupsMember,
      },
    });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

const AddMessages = async ({ group, to, from, message }) => {
  try {
    const availbeGroup = await Group.findById(group);
    availbeGroup.messages.push({
      userId: from,
      message,
    });

    await availbeGroup.save();
  } catch (error) {
    error;
  }
};

const AddMembers = async (req, res) => {
  const { groupId, member, type } = req.body;
  console.log({ groupId, member, type });

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    console.log(group);

    if (type === 'add') {
      console.log('.....................');
      // Filter out members already in the group
      const newMembers = member.filter(id => !group.members.includes((id))); // Convert string to ObjectId before comparison
      console.log(newMembers);
      console.log('.....................');

      // Add new members to the group
      group.members.push(...newMembers); // More efficient way to push multiple members
      const updatedGroup = await group.save();
      console.log(updatedGroup);
    } else if (type === 'remove') {
      // Remove members from the group
      group.members = group.members.filter(id => !member.some(m => m.toString() === id.toString())); // Convert ObjectId to string for comparison
      console.log(group.members);

      const updatedGroup = await group.save();
      console.log(updatedGroup);
    } else {
      return res.status(400).json({ error: 'Invalid type, must be "add" or "remove"' });
    }

    console.log('kiiii');
    res.status(200).json({ added: 'added' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { CreateGroup, AddMessages, getAllGroups,AddMembers };
