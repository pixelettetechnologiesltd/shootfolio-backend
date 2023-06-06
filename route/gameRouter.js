const express = require("express");
const gameController = require("./../controller/gameController");
const {protect,restrictTo}=require("../middleware/protectMiddleware")

const router = express.Router();
router.use(protect);
router.use(restrictTo('Admin'));
router.post("/gameAdd", gameController.gameAdd);
router.get("/gameGet", gameController.gameGet);
router.delete("/gameDelete/:id",gameController.gameDelete)
router.patch("/gameUpdate/:id",gameController.gameUpdate)
module.exports = router;