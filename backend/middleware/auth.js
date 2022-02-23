const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/userModels"); 
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncError(async (req, res, next)=>{
    const {token} =req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    
    const decodedData = jwt.verify(token ,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})


// checking whether user is admin or not 

exports.authourizedRole = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Sorry you are not allowed to access this resource`, 403));
        }
        next();
    }

}