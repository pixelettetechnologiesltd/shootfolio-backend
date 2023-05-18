const express = require("express");
const teamController = require("./../controller/teamController");
const {protect,restrictTo}=require("../middleware/protectMiddleware")

const router = express.Router();
router.use(protect);
router.use(restrictTo('admin'));
router.post("/teamAdd", teamController.teamAdd);
router.get("/teamGet", teamController.teamGet);
router.delete("/teamDelete/:id",teamController.teamDelete)
router.patch("/teamUpdate/:id",teamController.teamUpdate)
module.exports = router;