const asyncHandler = require("express-async-handler");
const brandServices = require("../services/brand.services");

const createBrand = asyncHandler(async (req, res) => {
  const Brand = await brandServices.createBrand(req.body);
  return res.status(200).json({
    success: Brand ? true : false,
    message: Brand ? "Tạo brand thành công" : "Tạo brand không thành công",
    Brand,
  });
});

const getBrands = asyncHandler(async (req, res) => {
  const Brand = await brandServices.getAllBrands();
  return res.status(200).json({
    success: Brand ? true : false,
    message: Brand ? "Lấy brands thành công" : "Lấy brands không thành công",
    Brand,
  });
});

const getBrand = asyncHandler(async (req, res) => {
  const { brand_id } = req.params;

  const Brand = await brandServices.getBrandById(brand_id);
  return res.status(200).json({
    success: Brand ? true : false,
    message: Brand ? "Lấy brand thành công" : "Lấy brand không thành công",
    Brand,
  });
});

const updatebrand = asyncHandler(async (req, res) => {
  const { brand_id } = req.params;
  const { title } = req.body;

  const Brand = await brandServices.updateBrandById(brand_id, req.body);
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

  const Brand = await brandServices.deleteBrandById(brand_id);
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
