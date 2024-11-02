const User = require("../../models/userModel/userModel");

exports.createUser = async (req, res) => {
  const { userId, email, name, nickname, picture, sub, updated_at } = req.body;

  try {
    let user = await User.findOne({ userId });

   if(user){
    return res.status(201).json({ message: "already Exists", user });
   }

    user = new User({
      userId,
      email,
      name,
      nickname,
      picture,
      sub,
      updated_at,
    });

   
    console.log(await user.save())
    return res.status(201).json({ message: "User created successfully", user }); // 201 Created
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserByProperty = async (req, res) => {
  console.log(req.query.userId)
  try {
    
    const user = await User.findOne(req.query);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
