// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getProductCategories } from "redux/reduxActions/productCategoriesAction";

const productCategoriesSlice = createSlice({
  name: "app",
  initialState: {
    productCategories: null,
    isLoading: false,
    isShowModal: false,
    isShowModalChildren: null,
    isShowCart: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.isShowModalChildren = action.payload.isShowModalChildren;
    },
    showCart: (state) => {
      state.isShowCart = state.isShowCart === false ? true : false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productCategories = action.payload;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export const { showModal, showCart } = productCategoriesSlice.actions;
export default productCategoriesSlice.reducer;
