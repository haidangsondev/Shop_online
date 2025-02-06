const orderModel = require("../models/order.model");

const createOrder = async (data) => {
  return await orderModel.create(data);
};

// Get all orders

const getAllOrders = async (data) => {
  return await orderModel.find(data);
};

// Get a order by id

const getOrderById = async (id) => {
  return await orderModel.findById(id);
};

// Update an order

const updateOrderById = async (id, data) => {
  return await orderModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete an order

const deleteOrderById = async (id) => {
  return await orderModel.findByIdAndDelete(id);
};

// Get orders by user
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
