import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";

const INITIAL_STATE: Product = {
  id: null,
  imageUrl: "",
  name: "",
  count: 0,
  size: { width: 0, height: 0 },
  weight: "0g",
  comments: [],
};

const slice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (build) => {
    build.addCase();
  },
});

export const productReducer = slice.reducer;
