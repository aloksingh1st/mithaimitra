const { compare } = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter Your Name"],
    maxLength: [30, "Name Can't Exceed greater than 30"],
    minlength: [3, "Name should have more than 3 characters"],
  },
  email: {
    type: String,
    require: [true, "Please Enter Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    require: true,
    minlength: [6, "Password Should be greater than 6 character"],
    select: false,
  },
  
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  
  this.password = this.password;
});

// JWT token/

userSchema.methods.getJWTToken =  function(){
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};


// creating compare password method

userSchema.methods.comparePassword = async function(p){
    return await compare(p, this.password); 
}



// generating password reser token 
userSchema.methods.getResetPasswordToken = async function(){
  //generating token 
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding to userSchema

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15*60*1000;

  return resetToken;
}




module.exports = mongoose.model("User", userSchema);
