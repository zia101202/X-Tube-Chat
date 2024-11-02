const { createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,getUserByProperty}=require('../../controllers/user/user')
const express = require('express')



const router = express.Router();
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);
router.get('/getUserByProperty', getUserByProperty);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);
module.exports = router;