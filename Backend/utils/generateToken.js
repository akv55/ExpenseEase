const jwt = require("jsonwebtoken");

// Generate a JWT for a given user id (valid for 30 days)
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = generateToken;
