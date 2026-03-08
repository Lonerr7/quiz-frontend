import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Question, TestEditorSliceInitialState} from '../schema/TestEditorSliceSchema';

const initialState: TestEditorSliceInitialState = {
  id: null,
  name: '',
  description: '',
  questions: [],
};

const testEditorSlice = createSlice({
  name: 'testEditor',
  initialState,
  reducers: {
    changeTestName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeTestDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },
    resetState: () => initialState,
  },
});

export const {reducer: testEditorSliceReducer} = testEditorSlice;
export const {actions: testEditorSliceActions} = testEditorSlice;