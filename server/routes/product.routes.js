const router = require("express").Router();
const productController = require("../controllers/product.controllers");
const { verifyAccessToken, verifyIsAdmin } = require("../utils/jwt");
const uploadCloud = require("../utils/cloudinary");
const { validateRequest } = require("../middlewares/validate.middleware");
// USER

router.get("/get-product/:product_id", productController.getProduct);
router.get("/get-product", productController.getProducts);
router.put(
  "/rating-product",
  verifyAccessToken,
  validateRequest("rating"),
  productController.ratingProduct
);
// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.post(
  "/create-product",
  uploadCloud.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  validateRequest("product"),
  productController.createProduct
);
router.put(
  "/update-product/:product_id",
  uploadCloud.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  productController.updateProduct
);
router.delete("/delete-product/:product_id", productController.deleteProduct);
router.put(
  "/uploadImage/:product_id",
  uploadCloud.array("images", 10),
  productController.uploadImagesProduct
);

module.exports = router;
