import axios from "axios";
import { SERVER_URL } from "../constants";
import { Comment } from "../types";

const instance = axios.create({
  baseURL: `${SERVER_URL}/comments`,
});

export const getCommentsApi = async (productId: number) => {
  const { data } = await instance.get(`?productId=${productId}`);
  return data;
};

export const addCommentApi = async (payload: Comment) => {
  const { data } = await instance.post("/", payload);
  return data;
};
export const deleteCommentApi = async (id: number) => {
  await instance.delete(`/${id}`);
};
