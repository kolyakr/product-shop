import axios from "axios";
import { SERVER_URL } from "../constants";
import { Product } from "../types";

const instance = axios.create({
  baseURL: `${SERVER_URL}/products`,
});

export const getProductsApi = async () => {
  const { data } = await instance.get("/");
  return data;
};

export const getProductByIdApi = async (id: number) => {
  const { data } = await instance.get(`/${id}`);
  return data;
};

export const addProductApi = async (payload: Product) => {
  const { data } = await instance.post("/", payload);
  return data;
};

export const updateProductApi = async (
  id: number,
  payload: Partial<Product>
) => {
  const { data } = await instance.patch(`/${id}`, payload);
  return data;
};

export const deleteProductApi = async (id: number) => {
  return await instance.delete(`/${id}`);
};
