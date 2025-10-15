const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.ATLAS_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/expenseease';

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
