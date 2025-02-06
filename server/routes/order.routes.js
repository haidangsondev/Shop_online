const orderController = require("../controllers/order.controllers");
const router = require("express").Router();
const { verifyAccessToken, verifyIsAdmin } = require("../utils/jwt");

// USER
router.post("/create-order", verifyAccessToken, orderController.createOrder);
router.get("/get-order-user", verifyAccessToken, orderController.getOrderUser);

// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.put("/update-status/:order_id", orderController.updateStatusByAdmin);
router.get("/get-orders", orderController.getOrders);

module.exports = router;
