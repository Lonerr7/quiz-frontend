import {normalizeData, type NormalizedData} from "../../helpers/normalizeData";
import {apiSlice} from "@/api/slice/api";
import type {SuccessResponse} from "@/api/schema/ResponseSchema";
import type {RootState} from "@/redux/store.ts";
import type {ITestBase, ITestForUser, PassTestResponse} from "@/api/endpoints/testsEndpoints/TestsEndpointsSchema.ts";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";

const testsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query<NormalizedData<ITestBase>, void>({
      query: () => '/tests',
      transformResponse: (response: SuccessResponse<{tests: ITestBase[]}>) => {
        return normalizeData(response.data.tests);
      },
    }),
    getTest: builder.query<ITestForUser, string>({
      query: (testId) => `/tests/${testId}`,
      transformResponse: (response: SuccessResponse<{test: ITestForUser}>) => {
        return response.data.test;
      }
    }),
    submitTest: builder.mutation<PassTestResponse, void>({
      queryFn: async (arg, api, extraOptions, baseQuery) =>  {
        const state = api.getState() as RootState;
        const {testId, answers} = state.passTest;

        const {data, error} = await baseQuery({
          url: `/tests/${testId}/submit`,
          method: 'POST',
          body: {answers}
        });

        if (error) {
          return {error: error as FetchBaseQueryError}
        }

        const successResponse = data as SuccessResponse<PassTestResponse>;
        return {data: successResponse.data};
      },
    })
  })
});

export const {useGetTestsQuery, useGetTestQuery, useSubmitTestMutation} = testsEndpoints;