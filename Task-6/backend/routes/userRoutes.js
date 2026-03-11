const express = require("express");
const User = require("../models/User");

// Create a router object to define routes related to "users"
const router = express.Router();

// GET /api/users
// This route returns a list of all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error.message);
    res.status(500).json({ message: "Server error while getting users" });
  }
});

// POST /api/users
// This route creates a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Basic validation to make sure all fields are provided
    if (!name || !email || !age) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newUser = new User({ name, email, age });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Server error while creating user" });
  }
});

// PUT /api/users/:id
// This route updates an existing user by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Server error while updating user" });
  }
});

// DELETE /api/users/:id
// This route deletes a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Server error while deleting user" });
  }
});

module.exports = router;

