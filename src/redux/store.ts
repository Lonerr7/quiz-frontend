import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from "@/api/slice/api";
import {passTestSliceReducer} from "./slices/passTestSlice/slice/passTestSlice";
import {testEditorSliceReducer} from './slices/testEditorSlice/slice/testEditorSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    passTest: passTestSliceReducer,
    testEditor: testEditorSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;