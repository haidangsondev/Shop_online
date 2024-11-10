import axios from "configAxios";

export const apiGetProductCategories = () =>
  axios({
    url: "/productCategory/get-product-categories",
    method: "get",
  });
