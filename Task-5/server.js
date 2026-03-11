const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");

// Load Environment Variables

dotenv.config();

// Create Express App
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running. Try /api/users"
  });
});

// All user endpoints start with /api/users
app.use("/api/users", userRoutes);

// Start Server + Connect DB
const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskfive_db";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      if (err && err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Close the other app or change PORT in your .env file.`
        );
        process.exit(1);
      }

      console.error("Server error:", err.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

