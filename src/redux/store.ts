import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from "@/api/slice/api";
import {passTestSliceReducer} from "@/redux/slices/passTestSlice/passTestSlice.ts";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    passTest: passTestSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;