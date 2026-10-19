import { createSlice } from "@reduxjs/toolkit";
import { loadComments } from "../../api/hackerNews";
import { createAppAsyncThunk } from "../../hooks/reduxHook";
import type { CommentItemType } from "../../types";

type CommentSliceType = {
  comments: CommentItemType[];
  status: "loading" | "error" | "fulfilled" | "refresh" | null;
  error: string | null;
};
const initialState: CommentSliceType = {
  comments: [],
  status: null,
  error: null,
};

export const loadingComments = createAppAsyncThunk(
  "comments/load",
  loadComments,
);
export const loadingSubComments = createAppAsyncThunk(
  "comments/loadsub",
  loadComments,
);
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadingComments.pending, (state) => {
        if (state.comments.length === 0) {
          state.status = "loading";
        } else {
          state.status = "refresh";
        }
        state.error = null;
      })
      .addCase(loadingComments.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Ошибка";
      })
      .addCase(loadingComments.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        state.comments = action.payload;
      })
      .addCase(loadingSubComments.fulfilled, (state, action) => {
        const temp = state.comments
          .flat(Infinity)
          .find((item) => item.id === action.payload[0].parent);

        if (temp?.kids) {
          temp.kids = action.payload;
        }
      });
  },
  selectors: {
    selectComments: (state) => state.comments,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export default commentsSlice.reducer;
export const { selectComments, selectError, selectStatus } =
  commentsSlice.selectors;
