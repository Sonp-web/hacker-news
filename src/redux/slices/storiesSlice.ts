import { createSlice } from "@reduxjs/toolkit";
import type { Story } from "../../types";
import { loadStories } from "../../api/hackerNews";
import { createAppAsyncThunk } from "../../hooks/reduxHook";

type StoriesSliceType = {
  stories: Story[];
  status: "loading" | "error" | "fulfilled" | "refresh" | null;
  error: string | null;
};
const initialState: StoriesSliceType = {
  stories: [],
  status: null,
  error: null,
};

export const loadingStories = createAppAsyncThunk("stories/load", loadStories, {
  condition: (arg: { isRefresh?: boolean } | undefined, { getState }) => {
    if (
      (!arg?.isRefresh && getState().stories.stories.length !== 0) ||
      getState().stories.status === "loading" ||
      getState().stories.status === "refresh"
    ) {
      return false;
    }
  },
});
const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadingStories.pending, (state) => {
        if (state.stories.length === 0) {
          state.status = "loading";
        } else {
          state.status = "refresh";
        }
        state.error = null;
      })
      .addCase(loadingStories.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Ошибка";
      })
      .addCase(loadingStories.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        state.stories = action.payload;
      });
  },
  selectors: {
    selectStories: (state) => state.stories,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});
export default storiesSlice.reducer;
export const { selectStatus, selectStories, selectError } =
  storiesSlice.selectors;
