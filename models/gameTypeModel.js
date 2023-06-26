const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    enum: ["Tennis", "Football", "BasketBall", "VolleyBall"],
  },
  iconUrl: {
    type: String,
    required: true,
  },
  quizAccess: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Active", "inActive", "Coming Soon"],
  },
});

const Game = mongoose.model("Gametype", gameSchema);

module.exports = Game;
