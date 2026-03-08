import type {RootState} from "@/redux/store.ts";

export const getTestQuestions = (state: RootState) => state.testEditor.questions;