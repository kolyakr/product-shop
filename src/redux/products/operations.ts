import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types";
import axios from "axios";
import {
  getProductsApi,
  getProductByIdApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
} from "../../api/products";

export const getProducts = createAsyncThunk<Product[], void>(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await getProductsApi();
      return products ?? [];
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Unknown error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getProductById = createAsyncThunk<Product, string>(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      return await getProductByIdApi(id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Unknown error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const addProduct = createAsyncThunk<Product, Product>(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      return await addProductApi(product);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Unknown error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const updateProduct = createAsyncThunk<
  Product,
  { product: Partial<Product>; id: string }
>("products/updateProduct", async ({ product, id }, { rejectWithValue }) => {
  try {
    const updatedProduct = await updateProductApi(id, product);
    return updatedProduct;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data || "Unknown error");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const deleteProduct = createAsyncThunk<string, string>(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      await deleteProductApi(id);
      return id;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Unknown error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
