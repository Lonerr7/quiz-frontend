import type {RootState} from "@/redux/store.ts";

export const getUnansweredQuestion = (state: RootState) => state.passTest.unansweredQuestion;