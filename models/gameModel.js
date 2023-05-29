const mongoose=require("mongoose");

const gameSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
      },
})
const game = mongoose.model("Game", gameSchema);
module.exports = game;