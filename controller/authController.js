const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require('util');

const signtoken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
exports.signup = async (req, res, next) => {
  const user = await User.create(req.body);
  const userId = user._id;
  const token = signtoken(userId);
  res.status(201).json({
    status: "user save successfully",
    token,
    data: {
      user,
    },
  });
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please provide email or password");
    return;
  }
  const user = await User.findOne({ email }).select("+password");
  const match = await user.correctPassword(password, user.password);

  if (!user || !match) {
    res.status(401).send("Invalid Credentials");
    return;
  }
  const token = signtoken(user._id);
  res.status(201).json({
    status: "success",
    token,
  });
};
exports.protect = async(req, res, next) => {
  let token = "";
  if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).send("You are not login please login to access");
    return ;
  }
  const decoded=await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  console.log(decoded);
  next();
};
exports.getusers = (req, res, next) => {
  console.log(req.headers);
  res.status(201).json({
    status: "you are succefully access protected route",
  });
};
