const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const productCategoryRouter = require("./productCategory.routes");
const blogCategoryRouter = require("./blogCategory.routes");
const blogRouter = require("./blog.routes");
const brandRouter = require("./brand.routes");
const couponRouter = require("./coupon.routes");
const orderRouter = require("./order.routes");
const dataRouter = require("./data.routes");
const { notFound, errorHandler } = require("../middlewares/error.middleware");

const initialRoutes = (app) => {
  app.use("/api/user/", userRouter);
  app.use("/api/product/", productRouter);
  app.use("/api/productCategory/", productCategoryRouter);
  app.use("/api/blogCategory/", blogCategoryRouter);
  app.use("/api/blog/", blogRouter);
  app.use("/api/brand/", brandRouter);
  app.use("/api/coupon/", couponRouter);
  app.use("/api/order/", orderRouter);
  app.use("/api/data/", dataRouter);

  //   crash error in here
  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initialRoutes;
