const express = require("express");
const userRouter = require("./route/userRouter");
const passport = require("./config/passport");
const session = require("express-session");
const dotenv = require("dotenv");
const AppError=require("./utils/appError")
const errorController=require("./controller/errorController")
dotenv.config({ path: "./config.env" });
const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRETKEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/shootfolio", userRouter);
app.all("*", (req, res, next) => {

  const err=new AppError(`Can't find ${req.originalUrl} on this server!`,404);
  next(err);
});
app.use(errorController);
module.exports = app;
