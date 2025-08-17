import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./slices/musicSlice";
export const store = configureStore({
  reducer: {
    music: musicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['music/setRecordingData'],
        ignoredPaths: ['music.recordingData'],
},
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;