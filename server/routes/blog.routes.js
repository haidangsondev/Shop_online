const router = require("express").Router();
const blogController = require("../controllers/blog.controller");
const uploadCloud = require("../utils/cloudinary");
const { verifyAccessToken, verifyIsAdmin } = require("../utils/jwt");

// USER
router.get("/get-blogs", blogController.getBlogs);
router.get("/get-blog/:blog_id", blogController.getBlog);
router.put("/like-blog/:blog_id", verifyAccessToken, blogController.likeBlog);
router.put(
  "/dislike-blog/:blog_id",
  verifyAccessToken,
  blogController.dislikeBlog
);

// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.post("/create-blog", blogController.createBlog);
router.put("/update-blog/:blog_id", blogController.updateBlog);
router.delete("/delete-blog/:blog_id", blogController.deleteBlog);
router.put(
  "/uploadImage-blog/:blog_id",
  uploadCloud.single("image"),
  blogController.uploadImageBlog
);

module.exports = router;
