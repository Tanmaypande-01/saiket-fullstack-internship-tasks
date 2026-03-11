const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// Create the Express app
const app = express();

// Choose a port for the server
const PORT = process.env.PORT || 3001;

// Connect to MongoDB database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS) from the frontend folder
app.use(express.static(path.join(__dirname, "..", "frontend")));

// API routes for user-related operations (CRUD)
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

