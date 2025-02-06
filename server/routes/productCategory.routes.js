const router = require("express").Router();
const productCategoryController = require("../controllers/productCategory.controllers");
const { validateRequest } = require("../middlewares/validate.middleware");
const { verifyAccessToken, verifyIsAdmin } = require("../utils/jwt");

// USER
router.get(
  "/get-product-categories",
  productCategoryController.getProductCategoies
);
router.get(
  "/get-product-category/:product_category_id",
  productCategoryController.getProductCategory
);
// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.post(
  "/create-product-category",
  validateRequest("productCategory"),
  productCategoryController.createProductCategory
);
router.put(
  "/update-product-category/:product_category_id",
  productCategoryController.updateProductCategory
);
router.delete(
  "/delete-product-category/:product_category_id",
  productCategoryController.deleteProductCategory
);

module.exports = router;
