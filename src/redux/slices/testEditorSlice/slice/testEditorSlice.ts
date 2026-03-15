import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Question, TestEditorSliceInitialState} from '../schema/TestEditorSliceSchema';
import {testsEndpoints} from "@/api/endpoints/testsEndpoints/testsEndpoints.ts";
import type {ITestForAdmin} from "@/api/endpoints/testsEndpoints/schema/TestsEndpointsSchema.ts";

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
    editQuestion: (state, action: PayloadAction<{questionIndex: number; question: Question}>) => {
      const {questionIndex, question} = action.payload;

      state.questions[questionIndex] = {...question};
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.questions = state.questions.filter((_, i) => i !== action.payload);
    },
    setTest: (state, action: PayloadAction<ITestForAdmin>) => {
      const {_id, name, questions, description} = action.payload;

      state.id = _id;
      state.name = name;
      state.questions = questions;
      state.description = description;
    },
    resetState: () => initialState
  },
  extraReducers: builder => {
    builder.addMatcher(testsEndpoints.endpoints.addTest.matchFulfilled, () => initialState)
  },
});

export const {reducer: testEditorSliceReducer} = testEditorSlice;
export const {actions: testEditorSliceActions} = testEditorSlice;