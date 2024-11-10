import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "apis";

const getUser = createAsyncThunk(
  "app/getUser",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetUser();

    if (!response.success) return rejectWithValue(response);
    return response.User;
  }
);

export { getUser };
