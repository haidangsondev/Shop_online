import axios from "configAxios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });
export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });
export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgot-password",
    method: "post",
    data,
  });
export const apiResetPassword = (data) =>
  axios({
    url: "/user/reset-password",
    method: "put",
    data,
  });
export const apiGetUser = () =>
  axios({
    url: "/user/get-user",
    method: "get",
  });
export const apiGetAllUser = (params) =>
  axios({
    url: "/user/get-all-user",
    method: "get",
    params,
  });
export const apiUpdateUser = (data, user_id) =>
  axios({
    url: "/user/update-user/" + user_id,
    method: "put",
    data,
  });
export const apiDeleteUser = (user_id) =>
  axios({
    url: "/user/delete-user/" + user_id,
    method: "delete",
  });
export const apiUpdateProfile = (data) =>
  axios({
    url: "/user/update-user",
    method: "put",
    data,
  });

export const apiAddCart = (data) =>
  axios({
    url: "/user/add-cart",
    method: "put",
    data,
  });

export const apiDeleteCart = (product_id) =>
  axios({
    url: "/user/delete-cart/" + product_id,
    method: "delete",
  });
