// const express = require("express");
// const {
//   newOrder,
//   getSingleOrder,
//   myOrders,
//   getAllOrders,
//   updateOrder,
//   deleteOrder,
//   payOrder,
// } = require("../controllers/orderController");
// const router = express.Router();

// const { isAuthenticated, authourizedRole } = require("../middleware/auth");

// router.route("/order/new").post(isAuthenticated, newOrder);
// router.route("/pay-order").post(isAuthenticated, payOrder);

// router.route("/order/:id").get(isAuthenticated, getSingleOrder);

// router.route("/orders/me").get(isAuthenticated, myOrders);

// router
//   .route("/admin/orders")
//   .get(isAuthenticated, authourizedRole("admin"), getAllOrders);

// router
//   .route("/admin/order/:id")
//   .put(isAuthenticated, authourizedRole("admin"), updateOrder)
//   .delete(isAuthenticated, authourizedRole("admin"), deleteOrder);

// module.exports = router;

const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticated, authourizedRole } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router.route("/orders/me").get(isAuthenticated, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticated, authourizedRole("admin"), getAllOrders);

router
  .route("/admin/orders/:id")
  .put(isAuthenticated, authourizedRole("admin"), updateOrder)

  router.route("/admin/order/delete/:id").delete(isAuthenticated,authourizedRole("admin"), deleteOrder);

module.exports = router;
