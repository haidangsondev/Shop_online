const couponModel = require("../models/coupon.model");

const createCoupon = async (data) => {
  return await couponModel.create(data);
};

const getAllCoupon = async () => {
  return await couponModel.find();
};

const getCouponById = async (id) => {
  return await couponModel.findById(id);
};

const updateCoupon = async (id, data) => {
  return await couponModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteCoupon = async (id) => {
  return await couponModel.findByIdAndDelete(id);
};
module.exports = {
  createCoupon,
  getAllCoupon,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
