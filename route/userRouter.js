const express = require("express");
const authController = require("./../controller/authController");
const { protect, restrictTo }=require("../middleware/protectMiddleware")
const apiController=require("./../controller/apiController")
const router = express.Router();
//authRoutes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout",authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);
router.route("/google").get(authController.googleAuth)
router.route("/facebook").get(authController.facebookAuth);
router.route("/auth/google/callback").get(authController.getGoogleAuth);
router.route("/auth/facebook/callback").get(authController.getFacebookAuth);
router.route("/confirm/:token").get(authController.emailVerify);
router.route("/getusers").get(protect,restrictTo("admin"), authController.getusers);
// router.route("/getusers").get(authController.protect,authController.restrictTo("Admin"), authController.getusers);
//CoinMarketCapApiRoutes
//router.route("/exchange/assets").get(apiController.coinCapMarketInfo);
module.exports = router;
