const productModel = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, brand, category, color, quantity } =
    req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req?.files?.images?.map((item) => item.path);
  if (
    !(title && price && description && brand && category && color && quantity)
  ) {
    throw new Error("Các trường tạo sản phẩm là bắt buộc");
  }
  req.body.slug = slugify(req.body.title);
  if (thumb) req.body.thumb = thumb;
  if (images) req.body.images = images;
  const Product = await productModel.create(req.body);
  return res.status(200).json({
    success: Product ? true : false,
    message: Product ? "Tạo sản phẩm thành công" : "Tạo sản phẩm thất bại",
    Product,
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { product_id } = req.params;
  if (!product_id) {
    return res.status(400).json({
      success: false,
      message: "product_id params là bắt buộc",
    });
  }
  const Product = await productModel.findById(product_id).populate({
    path: "ratings",
    populate: {
      path: "postedId",
      select: "username",
    },
  });
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
  let Product = productModel.find(result);

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

  const Products = await Product.exec();
  const counts = await productModel.find(result).countDocuments();

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
  if (!product_id || Object.keys(req.body).length === 0) {
    throw new Error(
      "product_id params và thông tin sản phẩm cập nhật là bắt buộc"
    );
  }

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const Product = await productModel.findByIdAndUpdate(product_id, req.body, {
    new: true,
  });
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
  if (!product_id) {
    throw new Error("product_id params là bắt buộc");
  }

  const Product = await productModel.findByIdAndDelete(product_id);
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

  if (!star || !product_id) {
    return res.status(400).json({
      success: false,
      message: "Trường star và product_id là bắt buộc",
    });
  }
  let Product = await productModel.findById(product_id);

  if (!Product) {
    throw new Error("Không tìm thấy sản phẩm");
  }
  let checkratingProducted = Product.ratings.find(
    (item) => item.postedId.toString() === _id
  );

  if (checkratingProducted) {
    checkratingProducted = await productModel.updateOne(
      {
        ratings: { $elemMatch: checkratingProducted },
      },
      {
        $set: {
          "ratings.$.star": +star,
          "ratings.$.comment": comment,
          "ratings.$.updatedAt": updatedAt,
        },
      },
      { new: true }
    );
  } else {
    checkratingProducted = await productModel.findByIdAndUpdate(
      product_id,
      {
        $push: { ratings: { star: +star, postedId: _id, comment, updatedAt } },
      },
      { new: true }
    );
  }
  const result = await productModel.findById(product_id);
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
  if (!product_id || !req.files) {
    return res.status(400).json({
      success: false,
      message: "product_id params và các file hình ảnh là bắt buộc",
    });
  }

  const Product = await productModel.findByIdAndUpdate(
    product_id,
    {
      $push: { images: { $each: req.files.map((item) => item.path) } },
    },
    { new: true }
  );
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
