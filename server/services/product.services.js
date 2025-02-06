const productModel = require("../models/product.model");

const createProduct = async (data) => {
  return await productModel.create(data);
};

const getDetailProduct = async (id) => {
  return await productModel.findById(id).populate({
    path: "ratings",
    populate: {
      path: "postedId",
      select: "username",
    },
  });
};

const findProduct = (data) => {
  return productModel.find(data);
};

const updateProduct = async (id, data) => {
  return await productModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  return await productModel.findByIdAndDelete(id);
};

const checkDataProduct = async (id) => {
  return await productModel.findById(id);
};

const updateRatinged = async (find, data) => {
  return await productModel.updateOne(
    {
      ratings: { $elemMatch: find },
    },
    {
      $set: {
        "ratings.$.star": +data.star,
        "ratings.$.comment": data.comment,
        "ratings.$.updatedAt": data.updatedAt,
      },
    },
    { new: true }
  );
};

const addRatings = async (id, data) => {
  return await productModel.findByIdAndUpdate(
    id,
    { $push: { ratings: data } },
    { new: true }
  );
};

const updateImageProduct = async (id, data) => {
  return await productModel.findByIdAndUpdate(
    id,
    {
      $push: { images: { $each: data } },
    },
    { new: true }
  );
};
module.exports = {
  createProduct,
  getDetailProduct,
  findProduct,
  updateProduct,
  deleteProduct,
  checkDataProduct,
  updateRatinged,
  addRatings,
  updateImageProduct,
};
