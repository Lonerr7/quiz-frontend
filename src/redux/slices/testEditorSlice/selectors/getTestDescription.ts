import type {RootState} from "@/redux/store.ts";

export const getTestDescription = (state: RootState) => state.testEditor.description;