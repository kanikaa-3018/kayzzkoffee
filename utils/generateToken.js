const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  if (!user || !user.email || !user._id) {
    throw new Error('Invalid user data for token generation');
  }

  const payload = {
    email: user.email,
    id: user._id
  };

  const options = {
    expiresIn: '1d' // Token expires in 1 day
  };

  try {
    return jwt.sign(payload, process.env.JWT_KEY, options);
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
};

module.exports.generateToken = generateToken;