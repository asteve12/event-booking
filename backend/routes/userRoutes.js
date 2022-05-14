const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:token").patch(authController.resetPassword);

router.use(authController.protectRoute);

router.route("/update-password").patch(authController.changePassword);

router
  .route("/me")
  .get(userController.getMe, userController.getUser)
  .patch(userController.updateMe, userController.updateUser);

//router.route("/").get(userController.getAllUsers);

router.use(authController.restrict("admin"));

/* router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser); */

module.exports = router;
