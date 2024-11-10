// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "redux/reduxActions/productsAction";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    newProducts: null,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newProducts = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
  },
});

export default productsSlice.reducer;
