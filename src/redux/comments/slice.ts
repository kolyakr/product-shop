import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { Comment } from "../../types";
import { addComment, deleteComment, getComments } from "./operations";

interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.isLoading = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id != action.payload
        );
        state.isLoading = false;
      })
      .addMatcher(
        isPending(getComments, addComment, deleteComment),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(getComments, addComment, deleteComment),
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

export const commentsReducer = slice.reducer;
