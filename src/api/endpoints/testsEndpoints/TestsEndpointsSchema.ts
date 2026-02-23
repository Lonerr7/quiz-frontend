interface ITestQuestionBase {
  _id: string;
  text: string;
  options: string[];
}

interface ITestQuestionForAdmin extends ITestQuestionBase {
  correctAnswer: number;
}

export interface ITestBase {
  _id: string;
  name: string;
  createdAt: string;
}

export interface ITestForUser extends ITestBase {
  description?: string;
  questions: ITestQuestionBase[];
}

export interface ITestForAdmin extends ITestBase {
  description?: string;
  questions: ITestQuestionForAdmin[];
}

interface IPassTestResult extends ITestForAdmin {
  isCorrect: boolean;
}
export interface PassTestResponse {
  testId: string;
  result: IPassTestResult[];
}