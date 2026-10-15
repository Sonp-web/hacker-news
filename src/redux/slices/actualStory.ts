import { createSlice } from "@reduxjs/toolkit";
import { loadOneStory } from "../../api/hackerNews";
import { createAppAsyncThunk } from "../../hooks/reduxHook";
import type { Story } from "../../types";

type ActualStorySlice = {
  story: Story | null;
  status: "loading" | "error" | "fulfilled" | null;
  error: string | null;
};
const initialState: ActualStorySlice = {
  story: null,
  status: null,
  error: null,
};
export const loadStory = createAppAsyncThunk("story/load", loadOneStory);

const actualStory = createSlice({
  name: "actualStory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadStory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadStory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Ошибка";
      })
      .addCase(loadStory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.story = action.payload;
      });
  },
  selectors: {
    selectStory: (state) => state.story,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export default actualStory.reducer;
export const { selectError, selectStatus, selectStory } = actualStory.selectors;
