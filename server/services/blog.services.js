const blogModel = require("../models/blog.model");

const createBlog = async (data) => {
  return await blogModel.create(data);
};
const updateBlog = async (id, data) => {
  return await blogModel.findByIdAndUpdate(id, data, { new: true });
};
const getBlogs = async () => {
  return await blogModel.find();
};
const getDetailBlog = async (id) => {
  return await blogModel.findById(id);
};
const deleteBlog = async (id) => {
  return await blogModel.findByIdAndDelete(id);
};

const removeDislikeBlog = async (id, find) => {
  return await blogModel.findByIdAndUpdate(
    id,
    { $pull: { dislikes: find } },
    { new: true }
  );
};
const removeLikeBlog = async (id, find) => {
  return await blogModel.findByIdAndUpdate(
    id,
    { $pull: { likes: find } },
    { new: true }
  );
};
const addLikeBlog = async (id, find) => {
  return await blogModel.findByIdAndUpdate(
    id,
    { $push: { likes: find } },
    { new: true }
  );
};
const addDisLikeBlog = async (id, find) => {
  return await blogModel.findByIdAndUpdate(
    id,
    { $push: { dislikes: _id } },
    { new: true }
  );
};

const uploadImageBlog = async (id, data) => {
  return await blogModel.findByIdAndUpdate(
    id,
    { $push: { images: data } },
    { new: true }
  );
};

module.exports = {
  createBlog,
  updateBlog,
  getBlogs,
  getDetailBlog,
  deleteBlog,
  removeDislikeBlog,
  removeLikeBlog,
  addLikeBlog,
  addDisLikeBlog,
  uploadImageBlog,
};
