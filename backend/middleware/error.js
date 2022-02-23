const ErrorHandler = require("../utils/errorHandler");

module.exports  = (err, req, res, next)=>{
    err.statusCode    = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

//Handling mongodb cast eroor

if(err.name === "CastError"){
    const message = `Invalid Resource at ${err.path}`;
    err = new ErrorHandler(message, 400); 
}

//mongodb  duplicate key error

// if(err.code =  11000){
//     // const message = `Duplicate ${Object.keys(err.keyValue)} Error`
//     const message = "duplicate key";
//     err = new ErrorHandler(message, 400); 
// }

// JWT TOKEN Error
if(err.name === "JsonWebTokenError"){
    const message = `json web token is invalid, try again`;
    err = new ErrorHandler(message, 400); 
}
// JWT TOKEN epiry error
if(err.name === "TokenExpiredError"){
    const message = `json web token is Expired, try again`;
    err = new ErrorHandler(message, 400); 
}
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        error:err
        })
}