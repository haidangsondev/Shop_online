const asyncHandler = require("express-async-handler");
const productCategoryServices = require("../services/productCategory.services");
const createProductCategory = asyncHandler(async (req, res) => {
  const productCategory = await productCategoryServices.createProductCategory(
    req.body
  );
  return res.status(200).json({
    success: productCategory ? true : false,
    message: productCategory
      ? "Tạo product category thành công"
      : "Tạo product category thất bại",
    productCategory,
  });
});

const getProductCategoies = asyncHandler(async (req, res) => {
  const productCategories =
    await productCategoryServices.getProductCategories();
  return res.status(200).json({
    success: productCategories ? true : false,
    message: productCategories
      ? "Lấy product categories thành công"
      : "Lấy product categories thất bại",
    productCategories,
  });
});

const getProductCategory = asyncHandler(async (req, res) => {
  const { product_category_id } = req.params;

  const productCategory =
    await productCategoryServices.getDetailProductCategory(product_category_id);
  return res.status(200).json({
    success: productCategory ? true : false,
    message: productCategory
      ? "Lấy product category thành công"
      : "Lấy product category thất bại",
    productCategory,
  });
});
const updateProductCategory = asyncHandler(async (req, res) => {
  const { product_category_id } = req.params;

  const productCategory = await productCategoryServices.updateProductCategory(
    product_category_id,
    req.body
  );
  return res.status(200).json({
    success: productCategory ? true : false,
    message: productCategory
      ? "Cập nhật product category thành công"
      : "Cập nhật product category thất bại",
    productCategory,
  });
});
const deleteProductCategory = asyncHandler(async (req, res) => {
  const { product_category_id } = req.params;

  const productCategory = await productCategoryServices.deleteProductCategory(
    product_category_id
  );
  return res.status(200).json({
    success: productCategory ? true : false,
    message: productCategory
      ? "Xóa product category thành công"
      : "Xóa product category thất bại",
  });
});
module.exports = {
  createProductCategory,
  getProductCategoies,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
