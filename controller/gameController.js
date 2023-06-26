const Game = require("./../models/gameTypeModel");
const GameMode = require("./../models/gameModeModel");
const gameLeague = require("./../models/gameLeagueModel");
const gameClubTeam =require("./../models/gameClubTeamModel")
const {
  CreateOne,
  getAll,
  deleteOne,
  updateOne,
  getOne,
} = require("./handleFactory");

exports.gameAdd = CreateOne(Game);
exports.gameGet = getAll(Game);
exports.gameGetOne = getOne(Game);
exports.gameDelete = deleteOne(Game);
exports.gameUpdate = updateOne(Game);
// Game mode Functions


exports.gameModeAdd = CreateOne(GameMode);
exports.gameGetMode = getAll(GameMode);
exports.gameModeDelete = deleteOne(GameMode);
exports.gameGetOneMode = getOne(GameMode);
exports.updateOneGameMode = updateOne(GameMode);

// Game League Function

exports.leagueAdd = CreateOne(gameLeague);
exports.leagueGet = getAll(gameLeague);
exports.leagueGetOne = getOne(gameLeague);
exports.leagueDelete = deleteOne(gameLeague);
exports.leagueUpdate = updateOne(gameLeague);


// Club function  

exports.clubAdd = CreateOne(gameClubTeam);
exports.clubGet = getAll(gameClubTeam);
exports.clubGetOne = getOne(gameClubTeam);
exports.clubDelete = deleteOne(gameClubTeam);
exports.clubUpdate = updateOne(gameClubTeam);