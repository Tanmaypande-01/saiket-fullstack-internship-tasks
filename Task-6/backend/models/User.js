const mongoose = require("mongoose");

// This schema describes what a "User" looks like in our database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// This creates the "users" collection in MongoDB
const User = mongoose.model("User", userSchema);

module.exports = User;

