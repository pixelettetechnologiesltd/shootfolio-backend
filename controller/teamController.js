const Team = require("./../models/gameClubTeamModel");

const { CreateOne, getAll, deleteOne, updateOne } = require("./handleFactory");

exports.teamAdd = CreateOne(Team);
exports.teamGet = getAll(Team);
exports.teamDelete = deleteOne(Team);
exports.teamUpdate = updateOne(Team);
