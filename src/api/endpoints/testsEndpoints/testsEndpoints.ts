import {normalizeData, type NormalizedData} from '../../helpers/normalizeData';
import {API_TAGS, apiSlice} from '@/api/slice/api';
import type {SuccessResponse} from '@/api/schema/ResponseSchema';
import type {RootState} from '@/redux/store.ts';
import type {
  ITestBase,
  ITestForAdmin,
  ITestForUser,
  PassTestResponse,
} from '@/api/endpoints/testsEndpoints/schema/TestsEndpointsSchema.ts';
import type {FetchBaseQueryError} from '@reduxjs/toolkit/query';

export const testsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query<NormalizedData<ITestBase>, void>({
      query: () => '/tests',
      transformResponse: (response: SuccessResponse<{tests: ITestBase[]}>) => {
        return normalizeData(response.data.tests);
      },
      providesTags: [API_TAGS.TESTS],
    }),
    getTest: builder.query<ITestForUser, string>({
      query: (testId) => `/tests/${testId}`,
      transformResponse: (response: SuccessResponse<{test: ITestForUser}>) => {
        return response.data.test;
      },
      providesTags: (result, error, arg) => [{type: API_TAGS.TESTS, id: arg}]
    }),
    getTestForAdmin: builder.query<ITestForAdmin, string>({
      query: (testId) => `/admin/tests/${testId}`,
      transformResponse: (response: SuccessResponse<{test: ITestForAdmin}>) => {
        return response.data.test;
      },
      providesTags: (result, error, arg) => [{type: API_TAGS.TESTS, id: arg}]
    }),
    submitTest: builder.mutation<PassTestResponse, void>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const state = api.getState() as RootState;
        const {testId, answers} = state.passTest;

        const {data, error} = await baseQuery({
          url: `/tests/${testId}/submit`,
          method: 'POST',
          body: {answers},
        });

        if (error) {
          return {error: error as FetchBaseQueryError};
        }

        const successResponse = data as SuccessResponse<PassTestResponse>;
        return {data: successResponse.data};
      },
    }),
    addTest: builder.mutation<SuccessResponse<null>, void>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const state = api.getState() as RootState;
        const {name, description, questions} = state.testEditor;

        const {data, error} = await baseQuery({
          url: `/admin/tests`,
          method: 'POST',
          body: {
            name,
            description,
            questions,
          },
        });

        if (error) {
          return {error: error as FetchBaseQueryError};
        }

        const successResponse = data as SuccessResponse<null>;
        return {data: successResponse};
      },
      invalidatesTags: [API_TAGS.TESTS],
    }),
    editTest: builder.mutation<ITestForAdmin, string>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const state = api.getState() as RootState;
        const {name, description, questions} = state.testEditor;

        const {data, error} = await baseQuery({
          url: `/admin/tests/${arg}`,
          method: 'PATCH',
          body: {
            name,
            description,
            questions,
          },
        });

        if (error) {
          return {error: error as FetchBaseQueryError};
        }

        const successResponse = data as SuccessResponse<ITestForAdmin>;
        return {data: successResponse.data};
      },
      invalidatesTags: (result, error, arg) => [API_TAGS.TESTS, {type: API_TAGS.TESTS, id: arg}],
    }),
    deleteTest: builder.mutation<null, string>({
      query: (testId) => ({
        url: `/admin/tests/${testId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAGS.TESTS],
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetTestQuery,
  useGetTestForAdminQuery,
  useSubmitTestMutation,
  useAddTestMutation,
  useEditTestMutation,
  useDeleteTestMutation,
} = testsEndpoints;
