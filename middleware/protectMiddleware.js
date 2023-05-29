const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
const protect = catchAsync(async (req, res, next) => {
  let token = "";
  if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).send("You are not login please login to access");
    return;
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next();
  }
  req.user = currentUser;

  next();
});
const restrictTo = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.roles)) {
      return next(
        new AppError("You dont have permission to perform this action", 401)
      );
    }
    next();
  };
};
module.exports = { protect, restrictTo };
