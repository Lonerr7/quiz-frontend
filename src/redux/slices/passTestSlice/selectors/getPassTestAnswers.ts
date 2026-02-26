import type {RootState} from "@/redux/store.ts";

export const getPassTestAnswers = (state: RootState) => state.passTest.answers;