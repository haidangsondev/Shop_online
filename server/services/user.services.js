const userModel = require("../models/user.model");

const checkDataUser = async (data) => {
  return await userModel.findOne(data);
};
const checkUser = async (id) => {
  return await userModel.findById(id);
};

const createUser = async (data) => {
  return await userModel.create(data);
};

const updateUser = async (id, data) => {
  return await userModel.findByIdAndUpdate(id, data, { new: true });
};

const updateAddress = async (id, data) => {
  return await userModel.findByIdAndUpdate(
    id,
    {
      $push: { address: data },
    },
    { new: true }
  );
};
const getDetailUser = async (id) => {
  return await userModel
    .findById(id)
    .select("-refreshToken -password")
    .populate({
      path: "cart",
      populate: {
        path: "product",
        select: "title thumb images price category brand",
      },
    })
    .populate("wishlist", "title thumb price color category");
};

const findUser = (data) => {
  return userModel.find(data);
};

const deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id);
};

const updateAddCarted = async (find, data) => {
  return await userModel.updateOne(
    { cart: { $elemMatch: find } },
    {
      $set: {
        "cart.$.quantity": data.quantity,
        "cart.$.color": data.color,
        "cart.$.price": data.price,
        "cart.$.thumb": data.thumb,
        "cart.$.title": data.title,
      },
    },
    { new: true }
  );
};

const addToCart = async (id, data) => {
  return await userModel.findByIdAndUpdate(
    id,
    { $push: { cart: data } },
    { new: true }
  );
};

const deleteCarted = async (id, find) => {
  return await userModel.updateOne(
    { _id: id },
    { $pull: { cart: find } },
    { new: true }
  );
};

const updateWishlist = async (id, data) => {
  return await userModel.findByIdAndUpdate(
    id,
    { $push: { wishlist: data } },
    { new: true }
  );
};

const deleteWishlist = async (id, find) => {
  return await userModel.updateOne(
    { _id: id },
    { $pull: { wishlist: find } },
    { new: true }
  );
};

module.exports = {
  checkDataUser,
  checkUser,
  createUser,
  updateUser,
  updateAddress,
  getDetailUser,
  findUser,
  deleteUser,
  updateAddCarted,
  addToCart,
  deleteCarted,
  updateWishlist,
  deleteWishlist,
};
