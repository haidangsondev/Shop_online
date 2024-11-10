// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "redux/reduxActions/userAction";
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    current: null,
    token: null,
    isLoading: false,
    message: "",
    currentCart: [],
  },
  reducers: {
    logining: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
      state.current = action.payload.current;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.current = null;
      state.token = null;
      state.isLoading = false;
      state.message = "";
    },
    clearMessage: (state, action) => {
      state.message = "";
    },
    updateCart: (state, action) => {
      const { product_id, quantity } = action.payload;
      const updatingCart = JSON.parse(JSON.stringify(state.currentCart));
      state.currentCart = updatingCart.map((item) => {
        if (item.product?._id === product_id) {
          return { ...item, quantity };
        } else return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
        state.isLogin = true;
        state.currentCart = action.payload.cart;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.current = null;
        state.token = null;
        state.message = "Phiên đăng nhập đã hết hạn!";
      });
  },
});
export const { logining, logout, clearMessage, updateCart } = userSlice.actions;

export default userSlice.reducer;
