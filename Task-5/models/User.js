const mongoose = require("mongoose");

// User Schema (Model Shape)
const userSchema = new mongoose.Schema(
  {
    // Person's name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]
    },

    // Email address (we keep it unique so duplicates are not allowed)
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
      // Note: for a student project, we keep email validation simple.
    },

    // Age in years
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [0, "Age cannot be negative"],
      max: [130, "Age seems too high"]
    }
  },
  {
    // Automatically adds createdAt and updatedAt fields.
    timestamps: true
  }
);

// Create the model (this lets us do: User.find(), User.create(), etc.)
const User = mongoose.model("User", userSchema);

module.exports = User;

