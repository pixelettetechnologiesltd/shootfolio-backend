const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    enum: ["Tennis", "Football", "BasketBall", "VolleyBall"],
  },
  iconUrl:{
    data:Buffer,
    contentType:String,
   },
  
  status: {
    type: String,
    required: true,
    enum: ["Active", "inActive", "Coming Soon"],
  },
  quizAccess: {
    type: String,
    enum: ["true", "false"],
  },
});

const Game = mongoose.model("Gametype", gameSchema);

module.exports = Game;
