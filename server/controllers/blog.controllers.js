const blogModel = require("../models/blog.model");
const asyncHandler = require("express-async-handler");
const blogServices = require("../services/blog.services");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const Blog = await blogServices.createBlog(req.body);
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Tạo blog  thành công" : "Tạo blog  thất bại",
    Blog,
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;

  const Blog = await blogServices.updateBlog(blog_id, req.body);
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Cập nhật blog  thành công" : "Cập nhật blog  thất bại",
    Blog,
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const Blog = await blogServices.getBlogs();
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Lấy blogs thành công" : "Lấy blogs thất bại",
    Blog,
  });
});

const getBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;

  const Blog = await blogServices.getDetailBlog(blog_id);
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Lấy blog thành công" : "Lấy blog thất bại",
    Blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;

  const Blog = await blogServices.deteleBlog(blog_id);
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Xóa blog thành công" : "Xóa blog thất bại",
    Blog,
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { blog_id } = req.params;

  const Blog = await blogServices.getDetailBlog(blog_id);
  if (!Blog) {
    throw new Error("Không tìm thấy bài đăng");
  }

  const checkedUserDislike = Blog.dislikes.find(
    (item) => item._id.toString() === _id
  );
  if (checkedUserDislike) {
    await blogServices.removeDislikeBlog(blog_id, _id);
  }

  const isLike = Blog.likes.find((item) => item._id.toString() === _id);

  if (isLike) {
    const Blog = await blogServices.removeLikeBlog(blog_id, _id);
    return res.status(200).json({
      success: Blog ? true : false,
      message: Blog
        ? "Bỏ like bài đăng thành công"
        : "Bỏ like bài đăng không thành công",
      Blog,
    });
  } else {
    const Blog = await blogServices.addLikeBlog(blog_id, _id);
    return res.status(200).json({
      success: Blog ? true : false,
      message: Blog
        ? "Like bài đăng thành công"
        : "Like bài đăng không thành công",
      Blog,
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { blog_id } = req.params;

  const Blog = await blogServices.getDetailBlog(blog_id);
  if (!Blog) {
    throw new Error("Không tìm thấy bài đăng");
  }

  const checkedUserLike = Blog.likes.find(
    (item) => item._id.toString() === _id
  );
  if (checkedUserLike) {
    await blogServices.removeLikeBlog(blog_id, _id);
  }

  const isLike = Blog.dislikes.find((item) => item._id.toString() === _id);

  if (isLike) {
    const Blog = await blogServices.removeDislikeBlog(blog_id, _id);
    return res.status(200).json({
      success: Blog ? true : false,
      message: Blog
        ? "Bỏ disLike bài đăng thành công"
        : "Bỏ disLike bài đăng không thành công",
      Blog,
    });
  } else {
    const Blog = await blogServices.addDisLikeBlog(blog_id, _id);
    return res.status(200).json({
      success: Blog ? true : false,
      message: Blog
        ? "Dis like bài đăng thành công"
        : "Dis like bài đăng không thành công",
      Blog,
    });
  }
});

const uploadImageBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;

  const Blog = await blogServices.uploadImageBlog(blog_id, req.file.path);
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Upload ảnh thành công" : "Upload ảnh không thành công",
    Blog,
  });
});
module.exports = {
  createBlog,
  updateBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImageBlog,
};
