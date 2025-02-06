const productModel = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const productServices = require("../services/product.services");

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, brand, category, color, quantity } =
    req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req?.files?.images?.map((item) => item.path);

  req.body.slug = slugify(req.body.title);
  if (thumb) req.body.thumb = thumb;
  if (images) req.body.images = images;
  const Product = await productServices.createProduct(req.body);
  return res.status(200).json({
    success: Product ? true : false,
    message: Product ? "Tạo sản phẩm thành công" : "Tạo sản phẩm thất bại",
    Product,
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { product_id } = req.params;

  const Product = await productServices.getDetailProduct(product_id);
  return res.status(200).json({
    success: Product ? true : false,
    message: Product
      ? "Lấy một sản phẩm thành công"
      : "Lấy một sản phẩm thất bại",
    Product,
  });
});

const getProducts = asyncHandler(async (req, res) => {
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
  if (queries?.title) {
    formatQueries.title = { $regex: queries.title, $options: "i" };
  }
  if (queries?.category) {
    formatQueries.category = { $regex: queries.category, $options: "i" };
  }
  if (queries?.brand) {
    formatQueries.brand = { $regex: queries.brand, $options: "i" };
  }

  let formatColor = {};
  if (queries?.color) {
    delete formatQueries.color;
    const colorQueries = queries.color
      .split(",")
      .map((item) => ({ color: { $regex: item, $options: "i" } }));
    formatColor = { $or: colorQueries };
  }

  let queryObject = {};
  if (queries?.q) {
    delete formatQueries.q;
    queryObject = {
      $or: [
        { color: { $regex: queries.q, $options: "i" } },
        { title: { $regex: queries.q, $options: "i" } },
        { category: { $regex: queries.q, $options: "i" } },
        { brand: { $regex: queries.q, $options: "i" } },
      ],
    };
  }
  const result = { ...formatColor, ...formatQueries, ...queryObject };
  let ProductQuery = productServices.findProduct(result); // Đảm bảo luôn là một query object

  //   sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    ProductQuery = ProductQuery.sort(sortBy);
  }

  //   fields
  if (req.query.fields) {
    const fieldsBy = req.query.fields.split(",").join(" ");
    ProductQuery = ProductQuery.select(fieldsBy);
  }

  //   pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || parseInt(process.env.LIMIT_PRODUCT, 10);
  const skip = (page - 1) * limit;

  ProductQuery = ProductQuery.skip(skip).limit(limit); // Thay đổi chỗ này

  const Products = await ProductQuery.exec();
  const counts = await productServices.findProduct(result).countDocuments();

  return res.status(200).json({
    success: Products ? true : false,
    message: Products ? "Lấy sản phẩm thành công" : "Lấy sản phẩm thất bại",
    counts,
    page,
    Product: Products,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { product_id } = req.params;
  const files = req?.files;
  if (files?.thumb) req.body.thumb = files?.thumb[0]?.path;
  if (files?.images) req.body.images = files?.images?.map((item) => item.path);

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const Product = await productServices.updateProduct(product_id, req.body);
  return res.status(200).json({
    success: Product ? true : false,
    message: Product
      ? "Cập nhật thông tin sản phẩm thành công"
      : "Cập nhật thông tin sản phẩm thất bại",
    Product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { product_id } = req.params;

  const Product = await productServices.deleteProduct(product_id);
  return res.status(200).json({
    success: Product ? true : false,
    message: Product
      ? "Xóa thông tin sản phẩm thành công"
      : "Xóa thông tin sản phẩm thất bại",
  });
});

const ratingProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, product_id, updatedAt } = req.body;

  let Product = await productServices.checkDataProduct(product_id);

  if (!Product) {
    throw new Error("Không tìm thấy sản phẩm");
  }
  let checkratingProducted = Product.ratings.find(
    (item) => item.postedId.toString() === _id
  );

  if (checkratingProducted) {
    const data = { star, comment, updatedAt };
    checkratingProducted = await productServices.updateRatinged(
      checkratingProducted,
      data
    );
  } else {
    const data = { star: +star, comment, postedId: _id, updatedAt };
    checkratingProducted = await productServices.addRatings(product_id, data);
  }
  const result = await productServices.checkDataProduct(product_id);
  const countUserRated = result.ratings.length;
  const sumStarRatings = result.ratings.reduce(
    (sum, item) => (sum += item.star),
    0
  );
  result.totalRatings = Math.round((sumStarRatings * 10) / countUserRated) / 10;
  await result.save();

  // console.log(updateresult);

  return res.status(200).json({
    success: result ? true : false,
    message: result
      ? "Đánh giá sản phẩm thành công"
      : "Đánh giá sản phẩm thất bại",
    Product: result,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { product_id } = req.params;

  const data = req.files.map((item) => item.path);
  const Product = await productServices.updateImageProduct(product_id, data);
  return res.status(200).json({
    success: Product ? true : false,
    message: Product ? "Upload ảnh thành công" : "Upload ảnh thất bại",
    Product,
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratingProduct,
  uploadImagesProduct,
};
