const mongoose = require("mongoose");
//const validator = require('validator');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["User must have name"],
    // unique: true,
    // trim: true,
    // maxlength: [40, "A user must have maxlength 40"],
    // minlength: [5, "A user have minimum length 10"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    // lowercase: true,
    // trim: true,
    // unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Valid Password"],
    // minlength: 10,
    select: false,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
 return await bcrypt.compare(candidatePassword,userPassword)
}
const user = mongoose.model("User", userSchema);
module.exports = user;
