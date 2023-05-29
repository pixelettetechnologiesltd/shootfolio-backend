const express = require("express");
const transactionController = require("./../controller/transactionController");
const {protect,restrictTo}=require("../middleware/protectMiddleware")

const router = express.Router();
// router.use(protect);
// router.use(restrictTo('admin'));
router.post("/transactionAdd", transactionController.transactionAdd);
router.get("/transactionGet", transactionController.transactionGet);
router.post("/create",transactionController.create)
router.get("/:borrowRate",transactionController.borrowRate)

module.exports = router;