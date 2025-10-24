const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  profileImage: {
    filename: {
      type: String,
      default: "profileImage"
    },
    url: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/147/147144.png"
    }
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = mongoose.model('User', userSchema);