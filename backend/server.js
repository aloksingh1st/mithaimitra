const app = require("./app");
const dotEnv = require("dotenv");
const connectDB = require("./config/db");
const Razorpay = require("razorpay");

const cloudinary = require("cloudinary");
const Order = require("./models/orderModels");
//Handling uncaught exception

process.on("uncaughtException", (err) =>{
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to unhandled uncaught error`); 
  process.exit(1);
})



dotEnv.config({ path: "backend/config/config.env" });
port = process.env.PORT;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(port, () => {
  console.log("Started");
});

const express = require('express');
const { isAuthenticated, authourizedRole } = require("./middleware/auth");

app.use(express.json({ extended: false }));


module.exports = Order;

app.get('/get-razorpay-key',isAuthenticated, (req, res) => {
  res.send({ key: process.env.RAZORPAY_API_KEY });
});

app.post('/create-order',isAuthenticated, async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const options = {
      amount: req.body.amount,
      currency: 'INR',
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send('Some error occured');
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/pay-order',isAuthenticated, async (req, res) => {
  try {
    const {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

   const newOrder = Order({
      // address: address,
      // name: name,
      // email: email,
      // phoneNo: phoneNo,
      // products: products,
      // isPaid: true,
      // amount: amount,
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: 'Payment was successfull',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


app.get("/orders/me",isAuthenticated, async(req, res) =>{
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
})

app.get("/admin/orders",isAuthenticated,authourizedRole("admin"), async(req, res)=>{
  const orders = await Order.find({});

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
})


app.get("/order/:id",isAuthenticated, async(req, res)=>{

  // let id = mongoose.mongo.ObjectId(req.params.id)
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
})

//Handling unhaldeled rejection to shutdown the server

process.on("unhandledRejection",err=>{
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to unhadled promise rejection`); 
  server.close(()=>{
    process.exit(1);
  });
})