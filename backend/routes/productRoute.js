// const express = require("express");
// const {
//   getAllProducts,
//   createProduct,
//   updateProducts,
//   deleteProducts,
//   getSingleProducts,
//   createProductReview,
//   getProductReviews,
//   deleteReview,
//   getAdminProducts
// } = require("../controllers/productController");
// const { isAuthenticated, authourizedRole } = require("../middleware/auth");
// const router = express.Router();

// router.route("/products").get(getAllProducts);
// router.route("/admin/new").post(isAuthenticated, authourizedRole("admin"), createProduct);
// router.route("/admin/:id").put(isAuthenticated, authourizedRole("admin"), updateProducts);
// router.route("/admin/:id").put(isAuthenticated, authourizedRole("admin"),  updateProducts).delete(deleteProducts);

// router
//   .route("/admin/products")
//   .get(isAuthenticated, authourizedRole("admin"), getAdminProducts);


// router.route("/products/:id").get(getSingleProducts);
// router.route("/products/review").put(isAuthenticated, createProductReview);
// router
//   .route("/reviews")
//   .get(getProductReviews)
//   .delete(isAuthenticated, deleteReview);

// module.exports = router;


const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");

const { isAuthenticated, authourizedRole } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticated, getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticated, authourizedRole("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticated, authourizedRole("admin"), updateProduct)
  .delete(isAuthenticated, authourizedRole("admin"), deleteProduct);

router.route("/products/:id").get(getProductDetails);

router.route("/review").put(isAuthenticated, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteReview);

module.exports = router;
