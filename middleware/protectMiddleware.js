const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");


const protect = catchAsync(async(req, res, next) => {
    let token = "";
    if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).send("You are not login please login to access");
      return;
    }
  
    const decoded=await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.userId=decoded.id;
    next()
  });

  module.exports=protect;