import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "../../types";
import {
  addCommentApi,
  deleteCommentApi,
  getCommentsApi,
} from "../../api/comments";
import axios from "axios";

export const getComments = createAsyncThunk<Comment[], number>(
  "comments/getComments",
  async (productId, { rejectWithValue }) => {
    try {
      return await getCommentsApi(productId);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Unknown error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const addComment = createAsyncThunk<Comment, Comment>(
  "comments/addComment",
  async (comment, { rejectWithValue }) => {
    try {
      return await addCommentApi(comment);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Unknown error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const deleteComment = createAsyncThunk<number, number>(
  "comments/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCommentApi(id);
      return id;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Unknown error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
