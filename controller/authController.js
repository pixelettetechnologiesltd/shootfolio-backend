const User = require("./../models/userModel");
const passport = require("../config/passport");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/Email");
const crypto = require("crypto");
const AppError = require("./../utils/appError");
const generateToken = require('./../config/jwtToken');


exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, cPassword } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(201).json({
      status: "Email already exists",
    });
   return ;
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
      role:user.roles
    };
   const token =generateToken(user._id,res);
    res.status(200).json({
      status: "Login Successfully",
      userInfo,
      token
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
  console.log(user);
  if (!user) {
    res.status(404).json({
      status:"User not found"
    })
    return;
  }
  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();
  sendEmail(req.body, token, (forgotPasswordEmail = "forgotPasswordEmail"));
  res.status(201).json({
    status: "Please Check your Email Associted with account",
  });
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    res.status(401).json({
      status: "Invalid or expired token",
    });
    return;
  }
  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.status(201).json({
    status: "Success",
  });
});



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
