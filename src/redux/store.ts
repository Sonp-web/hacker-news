import { configureStore } from "@reduxjs/toolkit";
import storiesSlice from "./slices/storiesSlice";
import actualStory from "./slices/actualStory";
import commentsSlice from "./slices/commentsSlice";
const store = configureStore({
  reducer: {
    stories: storiesSlice,
    actualStory: actualStory,
    comments: commentsSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
