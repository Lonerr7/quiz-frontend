import {normalizeData, type NormalizedData} from "../helpers/normalizeData";
import {apiSlice} from "@/api/slice/api";
import type {SuccessResponse} from "@/api/schema/ResponseSchema";

const testsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query<NormalizedData<ITestBase>, void>({
      query: () => '/tests',
      transformResponse: (response: SuccessResponse<{tests: ITestBase[]}>) => {
        return normalizeData(response.data.tests);
      },
    }),
    getTest: builder.query({
      query: () => ''
    })
  })
});

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

export const {useGetTestsQuery} = testsEndpoints;