const mongoose = require("mongoose");
const User = require("../models/User");

// Controller = "Logic"

// POST /api/users
// Create a new user in the database
async function createUser(req, res) {
  try {
    const { name, email, age } = req.body;
    const newUser = await User.create({ name, email, age });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email."
      });
    }

    if (error && error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });
    }

    return res.status(500).json({
      message: "Server error while creating user",
      error: error.message
    });
  }
}

// GET /api/users
// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching users",
      error: error.message
    });
  }
}

// GET /api/users/:id
// Get a single user by MongoDB id
async function getUserById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id format" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching user",
      error: error.message
    });
  }
}

// PUT /api/users/:id
// Update user (name/email/age) by id
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id format" });
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email."
      });
    }

    if (error && error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });
    }

    return res.status(500).json({
      message: "Server error while updating user",
      error: error.message
    });
  }
}

// DELETE /api/users/:id
// Delete user by id
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id format" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while deleting user",
      error: error.message
    });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};

