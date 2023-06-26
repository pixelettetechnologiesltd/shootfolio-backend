const mongoose=require("mongoose");

const gameClubTeamSchema=new mongoose.Schema({
    gameType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gametype",
        required: true,
      },
    title:{
        type:String,
        required:true,
    },
    Symbol:{
        type:String,
        required:true
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
const gameClubTeam = mongoose.model("gameClubTeam", gameClubTeamSchema);
module.exports = gameClubTeam;