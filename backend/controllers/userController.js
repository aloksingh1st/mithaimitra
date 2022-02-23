const User = require("../models/userModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample",
      url: "link some kind of",
    },
  });

  sendToken(user, 200, res);
});

// Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email or not
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Valid Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  sendToken(user, 200, res);
});

//Creating Log out functionality for user

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
       expires: new Date(Date.now()),
       httpOnly: true 
    });

  res.status(200).json({
    success: true,
    message: "logged out Successfully",
  });
});


//Creating A function for forget password

exports.forgotPassword= catchAsyncError(async(req, res, next)=>{
  const user = await User.findOne({email:req.body.email});

  if(!user){
    return next(new ErrorHandler("User not found", 404));
  }
  
  //getReset Password token

  const resetToken = await user.getResetPasswordToken();
  await user.save({validateBeforeSave:false});

  
  const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  
  const messageForEmail = `Your reset password token is :-- \n\n${resetPasswordURL}\n\n If You have not requested to reset your password then please Ignore it.`
   try {
     
     await sendEmail({
       email:user.email,
      subject:`Reset Your Password of Mithai Mitra`,
      messageForEmail
      
    })
    res.status(200).json({
      success:true,
      message:"Email Succesfully send"
    })
    
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
     await user.save({validateBeforeSave:false});
     return next(new ErrorHandler(error.message, 500));
     
   }
  });
  
  // RESET PASSWORD 
  
  exports.resetPassword = catchAsyncError(async (req, res, next)=>{
    // creating token hash 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt:Date.now()},
  });
      if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 404));
      }
      
      if(req.body.password !== req.body.confirmPassword){
        
        return next(new ErrorHandler("Password do not match", 404));
      }

      user.password = req.body.password;
      user.getResetPasswordToken =undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      sendToken(user, 200, res);
})

//creating a fuction to get User Details********************

exports.getUserDetails = catchAsyncError(async (req,res,next)=>{
  const user = await User.findById(req.user.id);
  
  
  res.status(200).json({
    success:true,
    user,
  });

})

// update password /

exports.updatePassword = catchAsyncError(async (req,res,next)=>{
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 401));
  }
  
  if(req.body.newPassword != req.body.confirmPassword){
    return next(new ErrorHandler("Password does not match", 401));
    
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
  
  
  
  res.status(200).json({
    success:true,
    user,
  });

})
// update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // if (req.body.avatar !== "") {
  //   const user = await User.findById(req.user.id);

  //   const imageId = user.avatar.public_id;

  //   await cloudinary.v2.uploader.destroy(imageId);

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });

  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});


// Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

	
// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

	// Delete User --Admin
  exports.deleteUser = catchAsyncError(async (req, res, next) => {
    console.log("Hleooo");
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    // const imageId = user.avatar.public_id;
  
    // await cloudinary.v2.uploader.destroy(imageId);
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });
