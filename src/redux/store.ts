import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./products/slice";
import { commentsReducer } from "./comments/slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
