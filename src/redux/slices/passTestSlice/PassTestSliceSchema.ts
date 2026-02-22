export type UserTestAnswers = Record<string, number>;

export interface PassTestSliceInitialState {
  testId: string | null;
  answers: UserTestAnswers;
}