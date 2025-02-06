const asyncHandler = require("express-async-handler");
const blogCategoryServices = require("../services/blogCategory.services");

const createBlogCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Trường title là bắt buộc",
    });
  }
  const blogCategory = await blogCategoryServices.createBlogCategory(req.body);
  return res.status(200).json({
    success: blogCategory ? true : false,
    message: blogCategory
      ? "Tạo blog category thành công"
      : "Tạo blog category thất bại",
    blogCategory,
  });
});

const getBlogCategoies = asyncHandler(async (req, res) => {
  const blogCategories = await blogCategoryServices.getBlogCategories();
  return res.status(200).json({
    success: blogCategories ? true : false,
    message: blogCategories
      ? "Lấy blog categories thành công"
      : "Lấy blog categories thất bại",
    blogCategories,
  });
});

const getBlogCategory = asyncHandler(async (req, res) => {
  const { blog_category_id } = req.params;
  if (!blog_category_id) {
    return res.status(400).json({
      success: false,
      message: "blog_category_id là bắt buộc",
    });
  }
  const blogCategory = await blogCategoryServices.getDetailBlogCategory(
    blog_category_id
  );
  return res.status(200).json({
    success: blogCategory ? true : false,
    message: blogCategory
      ? "Lấy blog category thành công"
      : "Lấy blog category thất bại",
    blogCategory,
  });
});

const updateBlogCategory = asyncHandler(async (req, res) => {
  const { blog_category_id } = req.params;
  const { title } = req.body;
  if (!blog_category_id || !title) {
    return res.status(400).json({
      success: false,
      message: "blog_category_id và thông tin cập nhật là bắt buộc",
    });
  }
  const blogCategory = await blogCategoryServices.updateBlogCategory(
    blog_category_id,
    req.body
  );
  return res.status(200).json({
    success: blogCategory ? true : false,
    message: blogCategory
      ? "Cập nhật blog category thành công"
      : "Cập nhật blog category thất bại",
    blogCategory,
  });
});
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { blog_category_id } = req.params;
  if (!blog_category_id) {
    return res.status(400).json({
      success: false,
      message: "blog_category_id là bắt buộc",
    });
  }
  const blogCategory = await blogCategoryServices.deleteBlogCategory(
    blog_category_id
  );
  return res.status(200).json({
    success: blogCategory ? true : false,
    message: blogCategory
      ? "Xóa blog category thành công"
      : "Xóa blog category thất bại",
  });
});
module.exports = {
  createBlogCategory,
  getBlogCategoies,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
