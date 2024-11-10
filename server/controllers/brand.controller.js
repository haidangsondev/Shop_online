const brandModel = require("../models/brand.model");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Trường title là bắt buộc",
    });
  }
  const Brand = await brandModel.create(req.body);
  return res.status(200).json({
    success: Brand ? true : false,
    message: Brand ? "Tạo brand thành công" : "Tạo brand không thành công",
    Brand,
  });
});

const getBrands = asyncHandler(async (req, res) => {
  const Brand = await brandModel.find();
  return res.status(200).json({
    success: Brand ? true : false,
    message: Brand ? "Lấy brands thành công" : "Lấy brands không thành công",
    Brand,
  });
});

const getBrand = asyncHandler(async (req, res) => {
  const { brand_id } = req.params;
  if (!brand_id) {
    return res.status(400).json({
      success: false,
      message: "brand_id là bắt buộc",
    });
  }
  const Brand = await brandModel.findById(brand_id);
  return res.status(200).json({
    success: Brand ? true : false,
    message: Brand ? "Lấy brand thành công" : "Lấy brand không thành công",
    Brand,
  });
});

const updatebrand = asyncHandler(async (req, res) => {
  const { brand_id } = req.params;
  const { title } = req.body;
  if (!brand_id || !title) {
    return res.status(400).json({
      success: false,
      message: "brand_id và thông tin cập nhật là bắt buộc",
    });
  }
  const Brand = await brandModel.findByIdAndUpdate(brand_id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: Brand ? true : false,
    message: Brand
      ? "Cập nhật brand thành công"
      : "Cập nhật brand không thành công",
    Brand,
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { brand_id } = req.params;
  if (!brand_id) {
    return res.status(400).json({
      success: false,
      message: "brand_id là bắt buộc",
    });
  }
  const Brand = await brandModel.findByIdAndDelete(brand_id);
  return res.status(200).json({
    success: Brand ? true : false,
    message: Brand ? "Xóa brand thành công" : "Xóa brand không thành công",
  });
});
module.exports = {
  createBrand,
  getBrands,
  getBrand,
  updatebrand,
  deleteBrand,
};
