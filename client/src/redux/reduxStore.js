import { configureStore } from "@reduxjs/toolkit";
import { productCategoriesSlice, productSlice, userSlice } from "./reduxSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const commonConfig = {
  key: "data/user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLogin", "token", "current", "currentCart"],
};
export const store = configureStore({
  reducer: {
    app: productCategoriesSlice,
    products: productSlice,
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
