const couponModel = require("../models/coupon.model");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expire } = req.body;
  if (!name || !discount || !expire) {
    return res.status(400).json({
      success: false,
      message: "Trường name, discount, expire là bắt buộc",
    });
  }
  const Coupon = await couponModel.create({
    ...req.body,
    expire: Date.now() + +expire * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: Coupon ? true : false,
    message: Coupon ? "Tạo Coupon thành công" : "Tạo Coupon không thành công",
    Coupon,
  });
});

const getCoupons = asyncHandler(async (req, res) => {
  const Coupon = await couponModel.find();
  return res.status(200).json({
    success: Coupon ? true : false,
    message: Coupon ? "Lấy coupons thành công" : "Lấy coupons không thành công",
    Coupon,
  });
});

const getCoupon = asyncHandler(async (req, res) => {
  const { coupon_id } = req.params;
  if (!coupon_id) {
    return res.status(400).json({
      success: false,
      message: "coupon_id là bắt buộc",
    });
  }
  const Coupon = await couponModel.findById(coupon_id);
  return res.status(200).json({
    success: Coupon ? true : false,
    message: Coupon ? "Lấy coupon thành công" : "Lấy coupon không thành công",
    Coupon,
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { coupon_id } = req.params;
  if (!coupon_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "coupon_id và thông tin cập nhật là bắt buộc",
    });
  }
  if (req.body.expire) {
    req.body.expire = Date.now() + +req.body.expire * 24 * 60 * 60 * 1000;
  }

  const Coupon = await couponModel.findByIdAndUpdate(coupon_id, req.body, {
    new: true,
  });
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
  if (!coupon_id) {
    return res.status(400).json({
      success: false,
      message: "coupon_id là bắt buộc",
    });
  }
  const Coupon = await couponModel.findByIdAndDelete(coupon_id);
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
