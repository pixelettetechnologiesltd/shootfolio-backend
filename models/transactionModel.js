const mongoose=require("mongoose");

const transactionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true,
    },
    transactonType:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})
const transaction = mongoose.model("Transaction", transactionSchema);
module.exports = transaction;