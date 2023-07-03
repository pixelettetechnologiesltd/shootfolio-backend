const mongoose = require("mongoose");

const gameLeagueSchema = new mongoose.Schema({
  gameType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gametype",
    required: true,
  },
  gameMode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gameMode",
    required: true,
  },
  leagueTitle: {
    type: String,
    required: true,
    unique: true,
  },
  investableBudget: {
    type: String,
    unique: true,
    required: true,
  },
  membershipType: {
    type: String,
    required: true,
    unique: true,
    enum: ["Free", "Subscription"],
  },
  status: {
    type: String,
    required: true,
    enum: ["true", "false"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const gameLeague = mongoose.model("gameLeague", gameLeagueSchema);
module.exports = gameLeague;
