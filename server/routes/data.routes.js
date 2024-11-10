const router = require("express").Router();
const insertController = require("../controllers/insertData");

router.post("/insert-data", insertController.insertProduct);
router.post(
  "/insert-data-product-category",
  insertController.insertProductCategory
);

module.exports = router;
