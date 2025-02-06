const asyncHandler = require("express-async-handler");
const couponServices = require("../services/coupon.services");
const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expire } = req.body;

  const data = {
    ...req.body,
    expire: Date.now() + +expire * 24 * 60 * 60 * 1000,
  };
  const Coupon = await couponServices.createCoupon(data);
  return res.status(200).json({
    success: Coupon ? true : false,
    message: Coupon ? "Tạo Coupon thành công" : "Tạo Coupon không thành công",
    Coupon,
  });
});

const getCoupons = asyncHandler(async (req, res) => {
  const Coupon = await couponServices.getAllCoupon();
  return res.status(200).json({
    success: Coupon ? true : false,
    message: Coupon ? "Lấy coupons thành công" : "Lấy coupons không thành công",
    Coupon,
  });
});

const getCoupon = asyncHandler(async (req, res) => {
  const { coupon_id } = req.params;

  const Coupon = await couponServices.getCouponById(coupon_id);
  return res.status(200).json({
    success: Coupon ? true : false,
    message: Coupon ? "Lấy coupon thành công" : "Lấy coupon không thành công",
    Coupon,
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { coupon_id } = req.params;

  if (req.body.expire) {
    req.body.expire = Date.now() + +req.body.expire * 24 * 60 * 60 * 1000;
  }

  const Coupon = await couponServices.updateCoupon(coupon_id, req.body);
  return res.status(200).json({
    success: Coupon ? true : false,
    message: Coupon
      ? "Cập nhật coupon thành công"
      : "Cập nhật coupon không thành công",
    Coupon,
  });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { coupon_id } = req.params;

  const Coupon = await couponServices.deleteCoupon(coupon_id);
  return res.status(200).json({
    success: Coupon ? true : false,
    message: Coupon ? "Xóa coupon thành công" : "Xóa coupon không thành công",
  });
});
module.exports = {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
