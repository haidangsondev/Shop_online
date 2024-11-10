const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");
const couponModel = require("../models/coupon.model");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address } = req.body;
  console.log(req.body);
  if (address) {
    await userModel.findByIdAndUpdate(
      _id,
      { address: address, cart: [] },
      { new: true }
    );
  }
  const Order = await orderModel.create({ products, total, orderBy: _id });
  return res.status(200).json({
    success: Order ? true : false,
    message: Order ? "Đặt hàng thành công" : "Đặt hàng không thành công",
    Order,
  });
});

const getOrderUser = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { _id } = req.user;

  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((item) => delete queries[item]);

  //   format filter
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatQueries = JSON.parse(queryString);

  //   filtering
  // if (queries?.title) {
  //   formatQueries.title = { $regex: queries.title, $options: "i" };
  // }
  // if (queries?.category) {
  //   formatQueries.category = { $regex: queries.category, $options: "i" };
  // }

  // let formatColor = {};
  // if (queries?.color) {
  //   delete formatQueries.color;
  //   const colorQueries = queries.color
  //     .split(",")
  //     .map((item) => ({ color: { $regex: item, $options: "i" } }));
  //   formatColor = { $or: colorQueries };
  // }

  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatQueries.q;
  //   queryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: "i" } },
  //       { title: { $regex: queries.q, $options: "i" } },
  //       { category: { $regex: queries.q, $options: "i" } },
  //       { brand: { $regex: queries.q, $options: "i" } },
  //     ],
  //   };
  // }

  const result = { ...formatQueries, orderBy: _id };
  let Product = orderModel.find(result);
  //   sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    Product = Product.sort(sortBy);
  }

  //   fields
  if (req.query.fields) {
    const fieldsBy = req.query.fields.split(",").join(" ");
    Product = Product.select(fieldsBy);
  }

  //   pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  Product.skip(skip).limit(limit);

  const Orders = await Product.exec();
  const counts = await orderModel.find(result).countDocuments();
  return res.status(200).json({
    success: Orders ? true : false,
    message: Orders ? "Lấy hóa đơn thành công" : "Lấy hóa đơn không thành công",
    counts,
    page,
    Orders: Orders,
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((item) => delete queries[item]);

  //   format filter
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatQueries = JSON.parse(queryString);

  //   filtering
  // if (queries?.title) {
  //   formatQueries.title = { $regex: queries.title, $options: "i" };
  // }
  // if (queries?.category) {
  //   formatQueries.category = { $regex: queries.category, $options: "i" };
  // }

  // let formatColor = {};
  // if (queries?.color) {
  //   delete formatQueries.color;
  //   const colorQueries = queries.color
  //     .split(",")
  //     .map((item) => ({ color: { $regex: item, $options: "i" } }));
  //   formatColor = { $or: colorQueries };
  // }

  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatQueries.q;
  //   queryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: "i" } },
  //       { title: { $regex: queries.q, $options: "i" } },
  //       { category: { $regex: queries.q, $options: "i" } },
  //       { brand: { $regex: queries.q, $options: "i" } },
  //     ],
  //   };
  // }
  if (queries?.q) {
    formatQueries.username = { $regex: queries.q, $options: "i" };
  }
  const result = { ...formatQueries };
  let Product = orderModel.find(result).populate("orderBy", "username");

  //   sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    Product = Product.sort(sortBy);
  }

  //   fields
  if (req.query.fields) {
    const fieldsBy = req.query.fields.split(",").join(" ");
    Product = Product.select(fieldsBy);
  }

  //   pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  Product.skip(skip).limit(limit);

  const Orders = await Product.exec();
  const counts = await orderModel.find(result).countDocuments();

  return res.status(200).json({
    success: Orders ? true : false,
    message: Orders ? "Lấy hóa đơn thành công" : "Lấy hóa đơn không thành công",
    counts,
    page,
    Orders: Orders,
  });
});

const updateStatusByAdmin = asyncHandler(async (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;
  const Order = await orderModel.findByIdAndUpdate(
    order_id,
    { status },
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: Order ? true : false,
    message: Order
      ? "Cập nhật trạng thái hóa đơn thành công"
      : "Cập nhật trạng thái hóa đơn không thành công",
    Order,
  });
});
module.exports = {
  // USER
  createOrder,
  getOrderUser,

  // ADMIN
  updateStatusByAdmin,
  getOrders,
};
