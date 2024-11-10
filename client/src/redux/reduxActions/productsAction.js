import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "apis";

const getProducts = createAsyncThunk(
  "app/products",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiProduct({ sort: "-createdAt" });
    if (!response.success) return rejectWithValue(response);
    return response.Product;
  }
);

export { getProducts };
