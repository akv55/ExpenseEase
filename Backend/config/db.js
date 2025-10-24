const mongoose = require('mongoose');
require("dotenv").config();

// database connection 
mongoose.set('strictQuery', false);
const DatabaseURL = process.env.MONGO_URL || process.env.ATLAS_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(DatabaseURL);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};
module.exports = connectDB;
