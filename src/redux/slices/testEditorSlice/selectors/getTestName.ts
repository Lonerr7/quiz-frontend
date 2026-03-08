import type {RootState} from "@/redux/store.ts";

export const getTestName = (state: RootState) => state.testEditor.name;