const brandModel = require("../models/brand.model");

const createBrand = async (data) => {
  return await brandModel.create(data);
};

// Get all brands

const getAllBrands = async () => {
  return await brandModel.find();
};

// Get a brand by id

const getBrandById = async (id) => {
  return await brandModel.findById(id);
};

// Update a brand by id

const updateBrandById = async (id, data) => {
  return await brandModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete a brand by id

const deleteBrandById = async (id) => {
  return await brandModel.findByIdAndDelete(id);
};

// Get brands by name

const getBrandsByName = async (name) => {
  return await brandModel.find({ name: new RegExp(name, "i") });
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
  getBrandsByName,
};
