const router = require("express").Router();
const brandController = require("../controllers/brand.controllers");
const { validateRequest } = require("../middlewares/validate.middleware");
const { verifyAccessToken, verifyIsAdmin } = require("../utils/jwt");

// USER
router.get("/get-brands", brandController.getBrands);
router.get("/get-brand/:brand_id", brandController.getBrand);
// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.post(
  "/create-brand",
  validateRequest("brand"),
  brandController.createBrand
);
router.put("/update-brand/:brand_id", brandController.updatebrand);
router.delete("/delete-brand/:brand_id", brandController.deleteBrand);

module.exports = router;
