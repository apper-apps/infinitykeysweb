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

// Store is ready for use - types would go here in TypeScript
// For JavaScript, we rely on runtime checking and IDE inference