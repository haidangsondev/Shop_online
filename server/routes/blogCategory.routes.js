const router = require("express").Router();
const blogCategoryController = require("../controllers/blogCategory.controller");
const { verifyAccessToken, verifyIsAdmin } = require("../utils/jwt");

// USER
router.get("/get-blog-categories", blogCategoryController.getBlogCategoies);
router.get(
  "/get-blog-category/:blog_category_id",
  blogCategoryController.getBlogCategory
);
// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.post("/create-blog-category", blogCategoryController.createBlogCategory);
router.put(
  "/update-blog-category/:blog_category_id",
  blogCategoryController.updateBlogCategory
);
router.delete(
  "/delete-blog-category/:blog_category_id",
  blogCategoryController.deleteBlogCategory
);

module.exports = router;
