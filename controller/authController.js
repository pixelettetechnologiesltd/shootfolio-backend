const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const passport = require("../config/passport");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/Email");
const crypto = require("crypto");
const AppError = require("./../utils/appError");
const protect = require("../middleware/protectMiddleware");
const signtoken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: Date.now() + 120000,
    }
  );
};
const cookieOption = {
  expires: Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  // secure:true,
  httpOnly: true,
};
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
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

  const token = signtoken(user._id);
  if (user) {
    sendEmail(req.body, user.confirmCode, (emailVerify = "emailVerify"));
    res.status(201).json({
      status: "user save successfully",
      token,
      data: {
        user,
      },
    });
  }
});
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please provide email or password");
    return;
  }
  const userStatus = await User.findOne({
    email,
  }).select("+status");
  if (userStatus.status == "Active") {
    const user = await User.findOne({
      email,
    }).select("+password");
    const match = await user.correctPassword(password, user.password);

    if (!user || !match) {
      res.status(401).send("Invalid Credentials");
      return;
    }
    const token = signtoken(user._id);

    res.cookie("jwt", token, cookieOption);
    res.status(201).json({
      status: "success",
      token,
    });
  } else {
    return next(new AppError("Pending Account. Please Verify Your Email", 401));
  }
};
exports.logout = catchAsync((req, res, next) => {
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
  });
  res.status(200).json({
    message:"Logged out successfully"
  })
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
      status: "Email successful! Please login",
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
    message: "Please Check your Email",
  });
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
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

exports.getusers = catchAsync((req, res, next) => {
  res.status(201).json({
    status: "You are successfully accessing a protected route ",
  });
});
exports.googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};
exports.getGoogleAuth = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "/login",
  })(req, res, () => {
    if (req.isAuthenticated()) {
      const token = signtoken(req.user._id);
      res.cookie("jwt", token, cookieOption);
      protect(req, res, next);

      // res.send("Authentcated");
    } else {
      res.send("Not Authenticated");
    }
  });
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
      protect(req, res, next);
      res.send("authentcated");
    } else {
      res.send("not authenticated");
    }
  });
};
// exports.restrictTo = (roles) => {
//   return (req, res, next) => {
//     if (!roles.include(req.user.role)) {
//       return next(new AppError("You dont have permission to perform this action", 401));
//     }
//   };
// };
