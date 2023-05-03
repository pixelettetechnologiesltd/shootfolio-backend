const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const passport = require("../config/passport");
const catchAsync=require("../utils/catchAsync")
const signtoken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
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
});
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
exports.protect = async (req, res, next) => {
  let token = "";
  if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).send("You are not login please login to access");
    return;
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
 
  next();
};
exports.getusers = (req, res, next) => {

  res.status(201).json({
    status:"You are successfully accessing a protected route "
  })

  
};
exports.googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};
exports.getGoogleAuth=(req,res,next)=>{
 passport.authenticate('google', { failureRedirect: '/login' })(req, res, () => {
   if(req.isAuthenticated()){
    
    res.send("authentcated");
   }
   else{
    res.send("not authenticated");
   }
  });
}
exports.facebookAuth=(req,res,next)=>{
  passport.authenticate("facebook")
}
exports.getFacebookAuth=(req,res,next)=>{
  passport.authenticate('facebook', { failureRedirect: '/login' })(req, res, () => {
    if(req.isAuthenticated()){
     
     res.send("authentcated");
    }
    else{
     res.send("not authenticated");
    }
   });
 }


