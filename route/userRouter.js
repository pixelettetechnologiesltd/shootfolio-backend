const express = require("express");
const authController = require("./../controller/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);
router.route("/google").get(authController.googleAuth)
router.route("/facebook").get(authController.facebookAuth);
router.route("/auth/google/callback").get(authController.getGoogleAuth);
router.route("/auth/facebook/callback").get(authController.getFacebookAuth);
router.route("/confirm/:token").get(authController.emailVerify);
router.route("/getusers").get(authController.protect, authController.getusers);
module.exports = router;
