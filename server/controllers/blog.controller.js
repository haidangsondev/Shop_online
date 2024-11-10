const blogModel = require("../models/blog.model");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({
      success: false,
      message: "Trường title, description và category là bắt buộc",
    });
  }
  const Blog = await blogModel.create(req.body);
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Tạo blog  thành công" : "Tạo blog  thất bại",
    Blog,
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;
  if (!blog_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Trường blog_id và thông tin cập nhật là bắt buộc",
    });
  }
  const Blog = await blogModel.findByIdAndUpdate(blog_id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Cập nhật blog  thành công" : "Cập nhật blog  thất bại",
    Blog,
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const Blog = await blogModel.find();
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Lấy blogs thành công" : "Lấy blogs thất bại",
    Blog,
  });
});

const getBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;
  if (!blog_id) {
    return res.status(400).json({
      success: false,
      message: "Trường blog_id là bắt buộc",
    });
  }
  const Blog = await blogModel
    .findByIdAndUpdate(blog_id, { $inc: { view: 1 } }, { new: true })
    .populate("likes", "username email")
    .populate("dislikes", "username email");
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Lấy blog thành công" : "Lấy blog thất bại",
    Blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;
  if (!blog_id) {
    return res.status(400).json({
      success: false,
      message: "Trường blog_id là bắt buộc",
    });
  }
  const Blog = await blogModel.findByIdAndDelete(blog_id);
  return res.status(200).json({
    success: Blog ? true : false,
    message: Blog ? "Xóa blog thành công" : "Xóa blog thất bại",
    Blog,
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { blog_id } = req.params;
  if (!blog_id) {
    return res.status(400).json({
      success: false,
      message: "Trường blog_id là bắt buộc",
    });
  }

  const Blog = await blogModel.findById(blog_id);
  if (!Blog) {
    throw new Error("Không tìm thấy bài đăng");
  }

  const checkedUserDislike = Blog.dislikes.find(
    (item) => item._id.toString() === _id
  );
  if (checkedUserDislike) {
    await blogModel.findByIdAndUpdate(
      blog_id,
      { $pull: { dislikes: _id } },
      { new: true }
    );
  }

  const isLike = Blog.likes.find((item) => item._id.toString() === _id);

  if (isLike) {
    const Blog = await blogModel.findByIdAndUpdate(
      blog_id,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: Blog ? true : false,
      message: Blog
        ? "Bỏ like bài đăng thành công"
        : "Bỏ like bài đăng không thành công",
      Blog,
    });
  } else {
    const Blog = await blogModel.findByIdAndUpdate(
      blog_id,
      { $push: { likes: _id } },
      { new: true }
    );
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
  if (!blog_id) {
    return res.status(400).json({
      success: false,
      message: "Trường blog_id là bắt buộc",
    });
  }

  const Blog = await blogModel.findById(blog_id);
  if (!Blog) {
    throw new Error("Không tìm thấy bài đăng");
  }

  const checkedUserLike = Blog.likes.find(
    (item) => item._id.toString() === _id
  );
  if (checkedUserLike) {
    await blogModel.findByIdAndUpdate(
      blog_id,
      { $pull: { likes: _id } },
      { new: true }
    );
  }

  const isLike = Blog.dislikes.find((item) => item._id.toString() === _id);

  if (isLike) {
    const Blog = await blogModel.findByIdAndUpdate(
      blog_id,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: Blog ? true : false,
      message: Blog
        ? "Bỏ disLike bài đăng thành công"
        : "Bỏ disLike bài đăng không thành công",
      Blog,
    });
  } else {
    const Blog = await blogModel.findByIdAndUpdate(
      blog_id,
      { $push: { dislikes: _id } },
      { new: true }
    );
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
  if (!blog_id || !req.file) {
    return res.status(400).json({
      success: false,
      message: "blog_id params và các file hình ảnh là bắt buộc",
    });
  }

  const Blog = await blogModel.findByIdAndUpdate(
    blog_id,
    {
      image: req.file.path,
    },
    { new: true }
  );
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
