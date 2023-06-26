const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: Date.now() + 120000 }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};
module.exports = generateToken;
