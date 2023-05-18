const mongoose=require("mongoose");

const teamSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
      },
})
const team = mongoose.model("Team", teamSchema);
module.exports = team;