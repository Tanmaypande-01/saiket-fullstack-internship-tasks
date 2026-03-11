const mongoose = require("mongoose");

// This function connects our Node.js app to the MongoDB database
async function connectDB() {
  try {
    
    const mongoURI = "mongodb://127.0.0.1:27017/user_management_db";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
}

module.exports = connectDB;

