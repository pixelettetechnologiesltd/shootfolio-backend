const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: Date.now() + 120000 }
  );
  return token;
};
module.exports = generateToken;
