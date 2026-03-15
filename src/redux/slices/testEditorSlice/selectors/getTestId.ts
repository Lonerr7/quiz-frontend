import type {RootState} from "@/redux/store.ts";

export const getTestId = (state: RootState) => state.testEditor.id;