const mongoose=require("mongoose");

const gameClubTeamSchema=new mongoose.Schema({
    gameType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gametype",
        required: true,
      },
    clublogo:{
     data:Buffer,
     contentType:String,
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
        enum: ["true", "false"],
      },
    createdAt: {
        type: Date, 
        default: Date.now,
      },
})
const gameClubTeam = mongoose.model("gameClubTeam", gameClubTeamSchema);
module.exports = gameClubTeam;