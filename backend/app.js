const express = require("express");
const cokkieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");





dotEnv.config({ path: "backend/config/config.env" });

const app = express();
app.use(express.json());
app.use(cokkieParser());
app.use(bodyParser.urlencoded({extended:true}));

// routes import
const product = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);
app.use("/api/v1", userRoute);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//middleware for error
app.use(errorMiddleware);


module.exports = app;
