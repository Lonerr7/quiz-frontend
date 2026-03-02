import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {PassTestSliceInitialState} from '@/redux/slices/passTestSlice/schema/PassTestSliceSchema.ts';

const initialState: PassTestSliceInitialState = {
  testId: null,
  answers: {},
  unansweredQuestion: null,
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
    setUnansweredQuestion: (state, action: PayloadAction<string | null>) => {
      state.unansweredQuestion = action.payload;
    },

    resetState: () => initialState,
  },
});

export const {reducer: passTestSliceReducer} = passTestSlice;
export const {actions: passTestSliceActions} = passTestSlice;
