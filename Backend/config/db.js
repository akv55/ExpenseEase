const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const ATLAS_URI = process.env.ATLAS_URI; 
    // const mongoURI = process.env.MONGO_URI;
    const conn = await mongoose.connect(ATLAS_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
