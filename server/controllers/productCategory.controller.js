const productCategoryModel = require("../models/productCategory.model");
const asyncHandler = require("express-async-handler");

const createProductCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Trường title là bắt buộc",
    });
  }
  const productCategory = await productCategoryModel.create(req.body);
  return res.status(200).json({
    success: productCategory ? true : false,
    message: productCategory
      ? "Tạo product category thành công"
      : "Tạo product category thất bại",
    productCategory,
  });
});

const getProductCategoies = asyncHandler(async (req, res) => {
  const productCategories = await productCategoryModel.find();
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
  if (!product_category_id) {
    return res.status(400).json({
      success: false,
      message: "product_category_id là bắt buộc",
    });
  }
  const productCategory = await productCategoryModel.findById(
    product_category_id
  );
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
  console.log(product_category_id);
  const { title } = req.body;
  if (!product_category_id || !title) {
    return res.status(400).json({
      success: false,
      message: "product_category_id và thông tin cập nhật là bắt buộc",
    });
  }
  const productCategory = await productCategoryModel.findByIdAndUpdate(
    product_category_id,
    req.body,
    { new: true }
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
  if (!product_category_id) {
    return res.status(400).json({
      success: false,
      message: "product_category_id là bắt buộc",
    });
  }
  const productCategory = await productCategoryModel.findByIdAndDelete(
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
