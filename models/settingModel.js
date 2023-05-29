const mongoose=require("mongoose");

const settingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    value:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})
const setting = mongoose.model("Setting", settingSchema);
module.exports = setting;