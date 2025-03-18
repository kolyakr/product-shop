import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./operations";
import { Product } from "../../types";

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: ProductsState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isLoading = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.isLoading = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.isLoading = false;
      })
      .addMatcher(
        isPending(
          getProducts,
          getProductById,
          addProduct,
          updateProduct,
          deleteProduct
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(
          getProducts,
          getProductById,
          addProduct,
          updateProduct,
          deleteProduct
        ),
        (state, action) => {
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : "Unexpected error occurred";
          state.isLoading = false;
        }
      );
  },
});

export const productsReducer = slice.reducer;
