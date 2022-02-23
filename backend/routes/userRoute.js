// const express = require("express");
// const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole } = require("../controllers/userController");
// const router = express.Router();
// const { isAuthenticated, authourizedRole } = require("../middleware/auth");

// router.route("/register").post(registerUser);

// router.route("/login").post(loginUser);
// router.route("/password/forgot").post(forgotPassword);
// router.route("/password/reset/:token").put(resetPassword);
// router.route("/logout").get(logout);
// router.route("/me").get(isAuthenticated ,getUserDetails);
// router.route("/password/update").put(isAuthenticated, updatePassword );
// router.route("/me/update").put(isAuthenticated ,updateProfile);
// router.route("/admin/users").get(isAuthenticated, authourizedRole("admin"), getAllUser);
// router.route("/admin/user/:id").get(isAuthenticated, authourizedRole("admin"), getSingleUser ).put(isAuthenticated, authourizedRole("admin"), updateUserRole).delete(isAuthenticated, authourizedRole("admin"), updateUserRole);

// module.exports = router


const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, authourizedRole } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticated, authourizedRole("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authourizedRole("admin"), getSingleUser)
  .put(isAuthenticated, authourizedRole("admin"), updateUserRole)
  .delete(isAuthenticated, authourizedRole("admin"), deleteUser);

module.exports = router;
