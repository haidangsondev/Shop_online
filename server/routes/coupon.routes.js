const router = require("express").Router();
const couponController = require("../controllers/coupon.controllers");
const { validateRequest } = require("../middlewares/validate.middleware");
const { verifyAccessToken, verifyIsAdmin } = require("../utils/jwt");

// USER
router.get("/get-coupons", couponController.getCoupons);
router.get("/get-coupon/:coupon_id", couponController.getCoupon);
// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.post(
  "/create-coupon",
  validateRequest("coupon"),
  couponController.createCoupon
);
router.put("/update-coupon/:coupon_id", couponController.updateCoupon);
router.delete("/delete-coupon/:coupon_id", couponController.deleteCoupon);

module.exports = router;
