const router = require("express").Router();
const userController = require("../controllers/user.controller");
const uploadCloud = require("../utils/cloudinary");
const { verifyAccessToken, verifyIsAdmin } = require("../utils/jwt");

// USER
router.get("/finalRegister/:register_token", userController.finalRegister);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", verifyAccessToken, userController.logout);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password", userController.resetPassword);
router.post("/refresh-token", userController.refreshAccessToken);
router.get("/get-user", verifyAccessToken, userController.getUser);
router.put(
  "/update-user",
  verifyAccessToken,
  uploadCloud.single("avatar"),
  userController.updateUser
);
router.put("/add-address-user", verifyAccessToken, userController.addAddress);
router.put("/add-cart", verifyAccessToken, userController.addCart);
router.put(
  "/update-wishlist/:product_id",
  verifyAccessToken,
  userController.updateWishlist
);
router.delete(
  "/delete-cart/:product_id",
  verifyAccessToken,
  userController.deleteCart
);

// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.get("/get-all-user", userController.getAllUser);
router.delete("/delete-user/:user_id", userController.deleteUser);
router.put("/update-user/:user_id", userController.updateUserByAdmin);

module.exports = router;
