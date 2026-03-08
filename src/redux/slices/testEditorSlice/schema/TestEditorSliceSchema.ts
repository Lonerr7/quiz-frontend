interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface TestEditorSliceInitialState {
  id: string | null;
  name: string;
  description?: string;
  questions: Question[];
}