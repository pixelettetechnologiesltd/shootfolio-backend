const Game = require("./../models/gameModel");

const { CreateOne, getAll, deleteOne, updateOne } = require("./handleFactory");

exports.gameAdd = CreateOne(Game);
exports.gameGet = getAll(Game);
exports.gameDelete = deleteOne(Game);
exports.gameUpdate = updateOne(Game);
