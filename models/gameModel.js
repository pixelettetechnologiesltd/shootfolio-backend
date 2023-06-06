const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sport: {
      type: String,
      required: true,
      enum: ["Tennis", "Football", "Volleyball", "Basketball"],
    },
    leagueType: {
      type: String,
      required: true,
      enum: ["Amateur", "Expert", "Pro", "Super"],
    },
    baseBudget: {
      type: String,
      required: true,
    },
  });
  
  const Game = mongoose.model("Game", gameSchema);
  
  module.exports = Game;