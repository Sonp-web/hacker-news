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
        const func = (
          item: CommentItemType | number,
        ): CommentItemType | undefined => {
          if (typeof item !== "number") {
            if (item.id === action.payload[0].parent) {
              return item;
            } else if (item.kids && typeof item.kids[0] !== "number") {
              for (let i = 0; i < item.kids?.length; i++) {
                const temp1: CommentItemType | undefined = func(item.kids[i]);
                if (temp1) {
                  return temp1;
                }
              }
              return undefined;
            }
          }
        };
        let temp: CommentItemType | undefined;
        for (let i = 0; i < state.comments.length; i++) {
          temp = func(state.comments[i]);

          if (temp) {
            break;
          }
        }

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
