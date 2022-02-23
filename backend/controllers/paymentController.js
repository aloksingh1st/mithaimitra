const Razorpay = require("razorpay");
const uniqid = require("uniqid");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});



exports.createOrder = (req, res, next) => {
  instance.orders.create({
    amount: 50000,
    currency: "INR",
    receipt: uniqid(),
    notes: { key1: "value3", key2: "value2" },
  },
  function (err, orders){
    if(err){
     return res.status(500).json({
        error:err,
      })
    }
    else{
      res.json(orders)
      console.log(orders)
    }
  });
};


exports.callBack = (req, res)=>{
  
}