import {normalizeData, type NormalizedData} from "../helpers/normalizeData";
import {apiSlice} from "@/api/slice/api";
import type {SuccessResponse} from "@/api/schema/ResponseSchema";

const testsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query<NormalizedData<ITestPreview>, void>({
      query: () => '/tests',
      transformResponse: (response: SuccessResponse<{tests: ITestPreview[]}>) => {
        return normalizeData(response.data.tests);
      },
    })
  })
});

export interface ITestPreview {
  _id: string;
  name: string;
  createdAt: string;
}

export const {useGetTestsQuery} = testsEndpoints;