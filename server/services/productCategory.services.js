const productCategoryModel = require("../models/productCategory.model");

const createProductCategory = async (data) => {
  return await productCategoryModel.create(data);
};

const getProductCategories = async () => {
  return await productCategoryModel.find();
};
const getDetailProductCategory = async (id) => {
  return await productCategoryModel.findById(id);
};
const updateProductCategory = async (id, data) => {
  return await productCategoryModel.findByIdAndUpdate(id, data, { new: true });
};
const deleteProductCategory = async (id) => {
  return await productCategoryModel.findByIdAndDelete(id);
};

module.exports = {
  createProductCategory,
  getProductCategories,
  getDetailProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
