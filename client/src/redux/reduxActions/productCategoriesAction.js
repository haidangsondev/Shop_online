import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "apis";

const getProductCategories = createAsyncThunk(
  "app/productCategories",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProductCategories();
    if (!response.success) return rejectWithValue(response);
    return response.productCategories;
  }
);
// const getProducts = createAsyncThunk(
//   "app/products",
//   async (data, { rejectWithValue }) => {
//     const response = await apis.apiProduct({});
//     if (!response.success) return rejectWithValue(response);
//     return response.Product;
//   }
// );

export { getProductCategories };
