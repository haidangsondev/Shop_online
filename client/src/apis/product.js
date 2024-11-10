import axios from "configAxios";

export const apiProduct = (params) =>
  axios({
    url: "/product/get-product",
    method: "get",
    params,
  });

export const apiGetProduct = (product_id) =>
  axios({
    url: `/product/get-product/${product_id}`,
    method: "get",
  });

export const apiRatings = (data) =>
  axios({
    url: "/product/rating-product",
    method: "put",
    data,
  });

export const apiCreateProduct = (data) =>
  axios({
    url: "/product/create-product",
    method: "post",
    data,
  });

export const apiUpdateProduct = (data, product_id) =>
  axios({
    url: "/product/update-product/" + product_id,
    method: "put",
    data,
  });

export const apiDeleteProduct = (product_id) =>
  axios({
    url: "/product/delete-product/" + product_id,
    method: "delete",
  });

export const apiCreateOrder = (data) =>
  axios({
    url: "/order/create-order",
    method: "post",
    data,
  });

export const apiGetOrderUser = (params) =>
  axios({
    url: "/order/get-order-user",
    method: "get",
    params,
  });

export const apiGetOrders = (params) =>
  axios({
    url: "/order/get-orders",
    method: "get",
    params,
  });

export const apiUpdateWishlist = (product_id) =>
  axios({
    url: "/user/update-wishlist/" + product_id,
    method: "put",
  });
