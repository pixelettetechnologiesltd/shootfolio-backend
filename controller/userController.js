const User = require("./../models/userModel");
const { CreateOne, getAll, deleteOne, updateOne } = require("./handleFactory");

exports.getusers = getAll(User);