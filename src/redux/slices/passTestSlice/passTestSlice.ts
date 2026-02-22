import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {PassTestSliceInitialState} from "@/redux/slices/passTestSlice/PassTestSliceSchema.ts";

const initialState: PassTestSliceInitialState = {
  testId: null,
  answers: {},
};

const passTestSlice = createSlice({
  name: 'passTest',
  initialState,
  reducers: {
    setTestId: (state, action: PayloadAction<string>) => {
      state.testId = action.payload;
    },
    setAnswer: (state, action: PayloadAction<{qId: string; answer: number}>) => {
      const {qId, answer} = action.payload;

      state.answers[qId] = answer;
    },

    resetState: () => initialState,
  },
});

export const {reducer: passTestSliceReducer} = passTestSlice;
export const {actions: passTestSliceActions} = passTestSlice;