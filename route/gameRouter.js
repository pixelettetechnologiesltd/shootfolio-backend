const express = require("express");
const gameController = require("./../controller/gameController");
const { protect, restrictTo } = require("../middleware/protectMiddleware");

const router = express.Router();
// router.use(protect);
// router.use(restrictTo("Admin"));
router.post("/gameAdd", gameController.gameAdd);
router.get("/gameGet", gameController.gameGet);
router.get("/gameGetOne/:id",gameController.gameGetOne)
router.delete("/gameDelete/:id", gameController.gameDelete);
router.patch("/gameUpdate/:id", gameController.gameUpdate);
//gameMode Routes
router.post("/gameModeAdd", gameController.gameModeAdd);
router.get("/gameGetMode", gameController.gameGetMode);
router.delete("/gameModeDelete/:id", gameController.gameModeDelete);
router.get("/gameGetOneMode/:id",gameController.gameGetOneMode)
router.patch("/updateOneGameMode/:id", gameController.updateOneGameMode);
//gameLeague Routes
router.post("/leagueAdd", gameController.leagueAdd);
router.get("/leagueGet", gameController.leagueGet);
router.get("/leagueGetOne/:id",gameController.leagueGetOne)
router.delete("/leagueDelete/:id", gameController.leagueDelete);
router.patch("/leagueUpdate/:id", gameController.leagueUpdate);
//Club Routes
router.post("/clubAdd", gameController.clubAdd);
router.get("/clubGet", gameController.clubGet);
router.get("/clubGetOne/:id",gameController.clubGetOne)
router.delete("/clubDelete/:id", gameController.clubDelete);
router.patch("/clubUpdate/:id", gameController.clubUpdate);
module.exports = router;
