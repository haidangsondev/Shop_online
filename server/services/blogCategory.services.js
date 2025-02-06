const blogCategoryModel = require("../models/blogCategory.model");

const createBlogCategory = async (data) => {
  return await blogCategoryModel.create(data);
};

const getBlogCategories = async () => {
  return await blogCategoryModel.find();
};

const getDetailBlogCategory = async (id) => {
  return await blogCategoryModel.findById(id);
};

const updateBlogCategory = async (id, data) => {
  return await blogCategoryModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteBlogCategory = async (id) => {
  return await blogCategoryModel.findByIdAndDelete(id);
};
module.exports = {
  createBlogCategory,
  getBlogCategories,
  getDetailBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
