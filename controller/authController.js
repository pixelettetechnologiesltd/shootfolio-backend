const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const passport = require("../config/passport");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/Email");
const crypto = require("crypto");
const AppError = require("./../utils/appError");
const protect = require("../middleware/protectMiddleware");
const generateToken = require('./../config/jwtToken');
const { CreateOne, getAll, deleteOne, updateOne } = require("./handleFactory");


const cookieOption = {
  httpOnly: true,
  sameSite: "strict", // Prevent CSRF attacks
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return next(new AppError("Email already exists", 400));
  }

  const longToken = crypto.randomBytes(32).toString("hex");
  const shortToken = crypto
    .createHash("sha256")
    .update(longToken)
    .digest("hex")
    .substring(0, 16);
  const addUser = {
    name: name,
    email: email,
    password: password,
    confirmCode: shortToken,
  };
  const user = await User.create(addUser);
  const token = generateToken(user._id,res);
  
  if (user) {
    sendEmail(req.body, user.confirmCode, (emailVerify = "emailVerify"));
    res.status(201).json({
      status: "Please check your email and verify your Account",
      data: {
        user,
      },
    });
  }
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  const match = await user?.correctPassword(password, user?.password);

  if (!user || !match) {
    return next(new AppError("Invalid Credentials", 401));
  }
  if (user?.status == "Active") {
    const userInfo = {
      email: user.email,
      name: user.name,
    };
    const token = generateToken(user._id,res);
    res.cookie("jwt", token);
    //console.log(res.getHeaders());
    res.status(201).json({
      status: "Login Successfully",
      userInfo,
      
    });
  } else {
    return next(new AppError("Pending Account. Please Verify Your Email", 401));
  }
});
exports.logout = catchAsync((req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged out successfully",
  });
});
exports.emailVerify = catchAsync(async (req, res, next) => {
  let result = await User.updateOne(
    {
      confirmCode: req.params.token,
    },
    {
      $set: {
        status: "Active",
      },
    }
  );
  if (result.modifiedCount > 0) {
    res.status(201).json({
      status: "Account successfully verified  Please login",
    });
  } else {
    return next(new AppError("Pending Account. Please Verify Your Email", 401));
  }
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new AppError("User not found", 401));
  }
  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();
  sendEmail(req.body, token, (forgotPasswordEmail = "forgotPasswordEmail"));
  res.status(201).json({
    status: "Success",
    message: "Please Check your Email Associted with account",
  });
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    return next(new AppError("Invalid or expired token", 401));
  }
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  if (newPassword != confirmPassword) {
    return next(new AppError("Passwords do not match", 401));
  }
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.status(201).json({
    status: "Password Update Successfully",
  });
});

exports.getusers = getAll(User);

exports.googleAuth = (req, res, next) => {
 
  passport.authenticate("google", { scope: ["profile"] })(req,res,next)
};
exports.getGoogleAuth = (req, res, next) => {
  console.log("sccess");
  passport.authenticate("google", {
  
    failureRedirect: "/login",
  }),(req,res)=>{
    res.redirect('/dashboard');
  }
};
exports.facebookAuth = (req, res, next) => {
  passport.authenticate("facebook");
};
exports.getFacebookAuth = (req, res, next) => {
  passport.authenticate("facebook", {
    failureRedirect: "/login",
  })(req, res, () => {
    if (req.isAuthenticated()) {
      const token = signtoken(req.user._id);
      res.cookie("jwt", token, cookieOption);
      //protect(req, res, next);
      res.send("authentcated");
    } else {
      res.send("not authenticated");
    }
  });
};
