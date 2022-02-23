const express = require("express");
const {
  createOrder,callBack
} = require("../controllers/paymentController");


const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");

router.route("/payment/createOrder").get(createOrder);
router.route("/payment/callBack").post(callBack);
// router.route("/payment/process").post(isAuthenticated, processPayment);

module.exports = router;
