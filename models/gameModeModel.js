const mongoose=require("mongoose");

const gameModeSchema=new mongoose.Schema({
    gameType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gametype",
        required: true,
      },
    modeTitle:{
        type:String,
        required:true,
        unique: true,
        enum: ["Idle", "P2P Weekly", "P2P Real Time Match", "Multiplayer Team"],
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "inActive"],
      },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})
const gameMode = mongoose.model("gameMode",gameModeSchema );
module.exports = gameMode;